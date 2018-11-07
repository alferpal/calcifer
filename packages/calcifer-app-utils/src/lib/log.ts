'use strict'

import { getFinalLogger as innerFinal, logger } from '@alferpal/calcifer-utils'
import pino from 'pino'

let childLogger: pino.Logger | undefined
let finalLogger: pino.Logger | undefined

function getChildLogger(name: string = '', type: string = 'application') {
  const childProperties: { [id: string]: string } = {}

  childProperties[type] = name

  if (!childLogger) {
    childLogger = logger.child(childProperties)
    finalLogger = innerFinal(childLogger)
  }

  return childLogger
}

function getFinalLogger() {
  return finalLogger
}

export { getChildLogger, getFinalLogger }
