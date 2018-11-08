'use strict'

import pino from 'pino'

const logger = pino(pino.destination())

const childLogger = logger.child({
  calciferName: process.env.CALCIFER_NAME || 'ENV.CALCIFER_NAME NOT PRESENT',
  calciferType: process.env.CALCIFER_TYPE || 'ENV.CALCIFER_TYPE NOT PRESENT',
})
const finalLogger = pino.final(childLogger)

export { childLogger as logger, finalLogger }
