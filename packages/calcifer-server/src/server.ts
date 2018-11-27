'use strict'

global.Promise = require('bluebird')

import hapi = require('hapi')
import path = require('path')
import { getRoutes, logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

const port = process.env.CALCIFER_SERVER_PORT
  ? process.env.CALCIFER_SERVER_PORT
  : 0

setProcessDefaults()

const server = new hapi.Server({
  port,
})

async function init() {
  const routesPath = path.join(__dirname, 'routes')

  try {
    const routes = await getRoutes(routesPath)

    routes.map((route) => {
      server.route(route)
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
        timeout: 32768,
      },
    })

    if (!module.parent) {
      await server.start()

      log.info(`Server running at: ${server.info.uri}`)
    }
  } catch (err) {
    log.fatal('Error preparing the server', err.stack)
  }
}

if (!module.parent) {
  init()
}

export { init as prepareServer, server }
