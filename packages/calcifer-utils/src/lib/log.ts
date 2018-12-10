'use strict'

import pino = require('pino')

const logger = pino(pino.destination())

const childLogger = logger.child({
  calciferName: process.env.CALCIFER_NAME || 'env.CALCIFER_NAME not present',
  calciferType: process.env.CALCIFER_TYPE || 'env.CALCIFER_TYPE not present',
})
const finalLogger = pino.final(childLogger)

export { childLogger as logger, finalLogger }
