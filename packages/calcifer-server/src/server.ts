'use strict'

global.Promise = require('bluebird')

import hapi = require('hapi')
import path = require('path')
import { logger as log, setProcessDefaults } from '@alferpal/calcifer-utils'

setProcessDefaults()

const server = new hapi.Server({
  port: 8192,
  host: 'localhost',
})

const init = async () => {
  try {
    await server.register(require('blipp'))

    await server.register({
      plugin: require('hapi-pino'),
      options: {
        instance: log,
      },
    })

    await server.register({
      plugin: require('wurst'),
      options: {
        cwd: path.join(__dirname, 'routes'),
      },
    })

    await server.start()

    log.info(`Server running at: ${server.info.uri}`)
  } catch (err) {
    log.fatal('Error starting the server', err.stack)
  }
}

init()
