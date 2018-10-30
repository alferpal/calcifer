'use strict'

import pino = require('pino')

const dest = pino.extreme()
const logger = pino(dest)

export = logger
