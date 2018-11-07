'use strict'

import pino from 'pino'

const dest = pino.destination()
const logger = pino(dest)

function getfinalLogger(logger) {
  return pino.final(logger)
}

export { getfinalLogger, logger }
