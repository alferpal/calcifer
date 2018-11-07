'use strict'

const UV_THREADPOOL_SIZE = 64

process.env.UV_THREADPOOL_SIZE = UV_THREADPOOL_SIZE

global.Promise = require('bluebird')

import * as Hapi from 'hapi'
import { log } from '@alferpal/calcifer-utils'

const server = new Hapi.Server({
  port: 8192,
  host: 'localhost',
})

const init = async () => {
  const routesPath = path.join(__dirname, '../routes')

  try {
    const files: string[] = await globAsync(`${routesPath}/*.js`)
    files.map((filePath: string) => {
      require(filePath).routes.map((route: Hapi.ServerRoute) => {
        server.route(route)
      })
    })

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
