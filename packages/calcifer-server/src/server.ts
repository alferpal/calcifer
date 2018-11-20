'use strict'

global.Promise = require('bluebird')

import hapi = require('hapi')
import path = require('path')
import { getRoutes, logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

setProcessDefaults()

const server = new hapi.Server({
  port: 8192,
})

async function init() {
  const routesPath = path.join(__dirname, 'routes')

  try {
    const routes = await getRoutes(routesPath)

    routes.map((route) => {
      server.route(route)
    })

    await server.register(require('blipp'))

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
    log.fatal('Error starting the server', err.stack)
  }
}

init()

export = server
