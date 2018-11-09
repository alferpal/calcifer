'use strict'

global.Promise = require('bluebird')

import * as Hapi from 'hapi'
import path from 'path'
import { getRoutes, logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

setProcessDefaults()

const server = new Hapi.Server({
  port: 8192,
  host: 'localhost',
})

const init = async () => {
  const routesPath = path.join(__dirname, '../routes')

  try {

    const routes = await getRoutes(routesPath, './**/*.js')

    routes.map((route) => {
      server.route(route)
    })

    await server.register(require('blipp'))

    await server.register(require('hapi-pino'))

    await server.start()

    log.info(`Server running at: ${server.info.uri}`)
  } catch (err) {
    log.fatal('Error starting the server', err.stack)
  }
}

init()
