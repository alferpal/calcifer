
import { logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'
import { getRoutes } from './route-loader'

// eslint-disable-next-line import/order
import hapi = require('@hapi/hapi')

interface PrepareServerOptions {
  routesPath: string,
  baseApiPath?: string,
  plugins?: Array<hapi.ServerRegisterPluginObject<unknown>>
}

const port = process.env.CALCIFER_SERVER_PORT
  ? process.env.CALCIFER_SERVER_PORT
  : 0

setProcessDefaults()

const server = new hapi.Server({
  port,
})

async function init(options: PrepareServerOptions) {
  const { routesPath, baseApiPath = '', plugins = [] } = options

  const routes = await getRoutes(routesPath, baseApiPath)

  server.route(routes)

  /* eslint-disable global-require */

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
      timeout: 32768,
    },
  })

  /* eslint-enable global-require */

  if (plugins.length) {
    await server.register(plugins)
  }
}

export { init as prepareServer, server }
