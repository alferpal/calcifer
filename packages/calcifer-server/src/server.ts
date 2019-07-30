
import { getRoutes, logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

global.Promise = require('bluebird')

import hapi = require('@hapi/hapi')
import path = require('path')

const port = process.env.CALCIFER_SERVER_PORT
  ? process.env.CALCIFER_SERVER_PORT
  : 0

setProcessDefaults()

const server = new hapi.Server({
  port,
})

async function init() {
  const routesPath = path.join(__dirname, 'routes')

  const routes = await getRoutes(routesPath)

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

  if (!module.parent) {
    await server.start()

    log.info(`Server running at: ${server.info.uri}`)
  }
}

if (!module.parent) {
  init()
}

export { init as prepareServer, server }
