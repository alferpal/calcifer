import pino = require('pino')

const logger = pino(pino.destination())

const childLogger = logger.child({
  calciferService: process.env.CALCIFER_SERVICE || 'env.CALCIFER_SERVICE not present',
})
const finalLogger = pino.final(childLogger)

export { childLogger as logger, finalLogger }
