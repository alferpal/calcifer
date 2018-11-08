'use strict'

import { logger, finalLogger } from './log'

function exit(code: number) {
  setImmediate(() => {
    process.exit(code)
  })
}

function multipleResolves(type: string, promise: Promise<any>, value: any) {
  finalLogger.fatal('multipleResolves', type, promise, value)
  exit(1)
}

function setProcessDefaults() {
  const events = {
    multipleResolves,
    uncaughtException,
    unhandledRejection,
    warning,
  }

  Object.entries(events).map(([event, callback]) => {
    console.dir({ event, callback }, { colors: true, depth: null })
    if (process.listenerCount(event) === 0) {
      // @ts-ignore
      process.on(event, callback)
    }
  })
}

function uncaughtException(err: Error) {
  finalLogger.fatal('uncaughtException', err.message, err.stack)

  exit(1)
}

function unhandledRejection(reason: Error | any, promise: Promise<any>) {
  if (reason.stack && reason.message) {
    finalLogger.fatal('unhandledRejection', reason.message, reason.stack, promise)
  } else {
    finalLogger.fatal('unhandledRejection', reason, promise)
  }

  exit(1)
}

function warning(warn: Error) {
  logger.warn('Warning', warn.name, warn.message, warn.stack)
}

export { setProcessDefaults }
