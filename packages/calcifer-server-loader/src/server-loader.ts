import CalciferTypes from '@alferpal/calcifer-types'
import hapi from '@hapi/hapi'
import policies from '@alferpal/calcifer-policies'
import { ServerError } from '@alferpal/calcifer-errors'
import { logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

import { getRoutes } from './route-loader'
import { init as initValidation, validateJWTHandler } from './jwt-validator'

const port = process.env.PORT
  ? process.env.PORT
  : 0

setProcessDefaults()

const server = new hapi.Server({
  port,
}) as CalciferTypes.Server.CalciferHapiServer

/**
 * Prepares the server instance exported in this module according to the options passed.
 * @param options - The options for preparing the server
 */
async function init(options: CalciferTypes.Server.CalciferServerOptions) {
  const {
    baseApiPath = '', extraPolicies = {}, initTokenValidation = true, plugins = [], routesPath,
  } = options

  const JWTSignature = process.env.JWT_SIGNATURE as string

  if (!JWTSignature) {
    throw new ServerError('No signature for JWT found in process.env.JWT_SIGNATURE')
  }

  const routes = await getRoutes(routesPath, baseApiPath)

  server.route(routes)

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

  allPolicies.forEach(([name, policy]) => {
    // @ts-ignore
    server.plugins.mrhorse.addPolicy(name, policy)
  })

  /* eslint-enable global-require */

  if (plugins.length) {
    await server.register(plugins)
  }
}

export { init as prepareServer, server }
