'use strict'

import { logger, finalLogger } from './log'
import os from 'os'

function environmentDefaults() {
  const cpus = process.env.UV_THREADPOOL_SIZE ?
    process.env.UV_THREADPOOL_SIZE :
    os.cpus().length

  process.env.UV_THREADPOOL_SIZE = `${cpus}`
}

function exit(code: number) {
  setImmediate(() => {
    process.exit(code)
  })
}

function multipleResolves(type: string, promise: Promise<any>, reason: any) {
  finalLogger.fatal(`mulipleResolves: ${type}`, { reason, promise })
  exit(1)
}

function setProcessDefaults() {
  const callbacks: { [id: string]: (...args: any) => void } = {
    multipleResolves,
    uncaughtException,
    unhandledRejection,
    warning,
  }

  Object.keys(callbacks).map((event) => {
    process.removeListener(event, callbacks[event])
    // @ts-ignore
    process.on(event, callbacks[event])
  })

  environmentDefaults()
}

function uncaughtException(err: Error) {
  finalLogger.fatal(err)

  exit(1)
}

function unhandledRejection(reason: Error | any, promise: Promise<any>) {
  finalLogger.fatal(reason, promise)
  exit(1)
}

function warning(warn: Error) {
  logger.warn(warn)
}

export { setProcessDefaults }
