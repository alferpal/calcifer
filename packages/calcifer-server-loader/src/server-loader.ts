import { ServerError } from '@alferpal/calcifer-errors'
import policies from '@alferpal/calcifer-policies'
import CalciferTypes from '@alferpal/calcifer-types'
import { logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'
import boom from '@hapi/boom'
import hapi from '@hapi/hapi'
import { v4 as uuidv4 } from 'uuid'

import { init as initValidation, validateJWTHandler } from './jwt-validator'
import { getRoutes } from './route-loader'

function isBoom(response: any): response is boom.Boom {
  return !!response.isBoom
}

setProcessDefaults()

/**
 * Prepares the server instance exported in this module according to the options passed.
 * @param options - The options for preparing the server
 */
async function getServer(options: CalciferTypes.Server.CalciferGetServerOptions) {
  const {
    baseApiPath = '', extraPolicies = {}, initTokenValidation = true, plugins = [], routesPath, port = 0,
  } = options

  const server = new hapi.Server({
    app: {
      REQUEST_ID_HEADER: 'x-request-id',
    },
    port,
  }) as CalciferTypes.Server.CalciferHapiServer

  const JWTSignature = process.env.JWT_SIGNATURE as string

  if (!JWTSignature) {
    throw new ServerError('No signature for JWT found in process.env.JWT_SIGNATURE')
  }

  const routes = await getRoutes(routesPath, baseApiPath)

  if (initTokenValidation) {
    await initValidation()
  }

  /* eslint-disable global-require */

  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: JWTSignature,
    validate: validateJWTHandler,
    verifyOptions: { algorithms: ['HS512'] },
  })

  await server.register({
    plugin: require('blipp'),
    options: {
      showAuth: true,
      showScope: true,
      showStart: true,
    },
  })

  await server.register({
    plugin: require('hapi-pino'),
    options: {
      instance: log,
    },
  })

  await server.register({
    plugin: require('hapi-pulse'),
    options: {
      logger: log,
      timeout: 16384,
    },
  })

  const allPolicies = [...Object.entries(extraPolicies), ...Object.entries(policies)]

  await server.register({
    plugin: require('mrhorse'),
    options: {
      plugins: {
        policies: allPolicies,
      },
    },
  })

  /* eslint-enable global-require */

  if (plugins.length) {
    await server.register(plugins)
  }

  server.route(routes)

  const reqIdHeader = server.settings.app.REQUEST_ID_HEADER

  server.ext('onRequest', (request: CalciferTypes.Server.CalciferHapiRequest | hapi.Request,
    h: hapi.ResponseToolkit) => {
    (
      request as CalciferTypes.Server.CalciferHapiRequest
    ).id = request.headers[reqIdHeader] || uuidv4()

    return h.continue
  })

  server.ext('onPreResponse', (request: CalciferTypes.Server.CalciferHapiRequest | hapi.Request,
    h: hapi.ResponseToolkit) => {
    const { id } = (request as CalciferTypes.Server.CalciferHapiRequest)

    const { response } = request

    if (isBoom(response)) {
      // @ts-ignore
      response.output.headers[reqIdHeader] = id
    } else {
      response.header(reqIdHeader, id)
    }

    return h.continue
  })

  return server
}

export { getServer }
