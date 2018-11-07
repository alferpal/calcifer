'use strict'

import { getFinalLogger as innerFinal, log, } from '@alferpal/calcifer-utils'

let childLogger
let finalLogger

function getChildLogger(name: string = '', type: string = 'application') {
  const childProperties: { [id: string]: string } = {}

  childProperties[type] = name

  if (!childLogger) {
    childLogger = log.child(childProperties)
    finalLogger = childLogger.final()
  }

  return childLogger
}

function getFinalLogger() {
  return innerFinal(childLogger)
}

export { getchildLogger, getFinalLogger }
