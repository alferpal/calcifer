'use strict'

import os = require('os')
import { logger, finalLogger } from './log'

/**
 *  Sets some environmental defaults as listed:
 *
 * - UV_THREADPOOL_SIZE: Already existing value or number of CPUs if not defined
 */
function environmentDefaults() {
  const cpus = process.env.UV_THREADPOOL_SIZE ?
    process.env.UV_THREADPOOL_SIZE :
    os.cpus().length

  process.env.UV_THREADPOOL_SIZE = `${cpus}`
}

/**
 * Exists the process in the next tick
 * - @param code The numeric code to be used as exist code
 */
function exit(code: number) {
  process.nextTick(process.exit, code)
}

/**
 * Handler for multipleReslves
 * Prints the error synchronously and exits the process
 * - @param type The error type
 * - @param promise The promise with more than one reject or rresolve
 * - @param reason The value that caused the multiple resolution
 */
function multipleResolves(type: string, promise: Promise<any>, reason: any) {
  finalLogger.fatal(`mulipleResolves: ${type}`, { reason, promise })
  exit(1)
}

/**
 * Sets environment process defaults and installs handlers for:

 *  - multiple resolves
 *  - uncaught exception
 *  - unhandled rejection
 *  - warning
 */
function setProcessDefaults() {
  const callbacks: { [id: string]: (...args: any[]) => void } = {
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

/**
 * Handler four uncaughtException
 * Prints the error synchronously and exits the process
 * - @param err The uncaught error
 */
function uncaughtException(err: Error) {
  finalLogger.fatal(err)

  exit(1)
}

/**
 * Handler for unhandledRejection
 * Prints the error synchronously and exits the process
 * - @param reason The error
 */
function unhandledRejection(reason: Error | any) {
  finalLogger.fatal(reason)

  exit(1)
}

/**
 * Handler for warnings
 * Prints the warning
 * - @param warn The error
 */
function warning(warn: Error) {
  logger.warn(warn)
}

export { setProcessDefaults }
