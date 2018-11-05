'use strict'

import pino = require('pino')

const dest = pino.destination()
const logger = pino(dest)

export = logger
