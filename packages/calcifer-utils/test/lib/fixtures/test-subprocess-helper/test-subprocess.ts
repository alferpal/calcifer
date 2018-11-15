'use strict'

import { logger } from '../../../../src'

logger.info('test-subprocess')

logger.info({ executor: process.argv[process.argv.length - 1] })
