'use strict'

import * as appUtils from '@alferpal/calcifer-app-utils'
import pino from 'pino'

let finalLogger: pino.Logger | undefined
let logger: pino.Logger | undefined

function getLogger(name: string = '', type: string = 'service') {

  if (!logger) {
    logger = appUtils.getLogger(name, type)
    finalLogger = appUtils.getFinalLogger(logger)
  }

  return logger
}

export { getLogger }
