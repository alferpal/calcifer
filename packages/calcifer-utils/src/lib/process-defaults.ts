import os from 'os'

import { finalLogger, logger } from './log'

/**
 *  Sets some environmental defaults as listed:
 *
 * - UV_THREADPOOL_SIZE: Already existing value or number of CPUs if not defined
 */
function environmentDefaults() {
  const cpus = process.env.UV_THREADPOOL_SIZE
    ? process.env.UV_THREADPOOL_SIZE
    : os.cpus().length

  process.env.UV_THREADPOOL_SIZE = `${cpus}`
}

/**
 * Exists the process in the next tick
 * @param code The numeric code to be used as exist code
 */
function exit(code: number) {
  process.nextTick(() => {
    // eslint-disable-next-line no-process-exit
    process.exit(code)
  })
}

/**
 * Sets environment process defaults and installs handlers for:

 *  - uncaught exception
 *  - unhandled rejection
 *  - warning
 */
function setProcessDefaults() {
  const callbacks: { [id: string]: (...args: any[]) => void, } = {
    uncaughtException,
    unhandledRejection,
    warning,
  }

  Object.keys(callbacks).forEach((event) => {
    process.removeListener(event, callbacks[event])

    process.on(event, callbacks[event])
  })

  environmentDefaults()
}

/**
 * Handler for uncaughtException
 * Prints the error synchronously and exits the process
 * @param err The uncaught error
 */
function uncaughtException(err: Error) {
  finalLogger.fatal(err, 'Unhandled exception')

  exit(1)
}

/**
 * Handler for unhandledRejection
 * Prints the error synchronously and exits the process
 * @param reason The error
 */
function unhandledRejection(reason: Error | any) {
  finalLogger.fatal(reason, 'Unhandled rejection')

  exit(1)
}

/**
 * Handler for warnings
 * Prints the warning
 * @param warn The error
 */
function warning(warn: Error) {
  logger.warn(warn, 'Warning')
}

export { setProcessDefaults }
