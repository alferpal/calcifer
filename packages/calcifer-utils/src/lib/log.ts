'use strict'

import pino from 'pino'

const dest = pino.destination()
const logger = pino(dest)

function getFinalLogger(logger: pino.Logger): pino.Logger {
  return pino.final(logger)
}

export { getFinalLogger, logger }
