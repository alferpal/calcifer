'use strict'

process.env.UV_THREADPOOL_SIZE = '8'

global.Promise = require('bluebird')

import * as Hapi from 'hapi'
import { logger as log } from '@alferpal/calcifer-utils'

const server = new Hapi.Server({
  port: 8192,
  host: 'localhost',
})

const init = async () => {
  const routesPath = path.join(__dirname, '../routes')

  try {

    await server.register(require('blipp'))

    await server.register(require('hapi-pino'))

    await server.start()

    log.info(`Server running at: ${server.info.uri}`)
  } catch (err) {
    log.fatal('Error starting the server', err.stack)
  }
}

process.on('unhandledRejection', (err: Error) => {
  log.fatal(err)
  process.exit(1)
})

init()
