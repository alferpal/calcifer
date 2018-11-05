'use strict'

import pino from 'pino'

const dest = pino.destination()
const logger = pino(dest)

export { logger }
