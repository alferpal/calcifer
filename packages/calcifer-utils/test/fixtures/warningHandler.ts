'use strict'

import { setProcessDefaults } from '../../src/lib/process-defaults'

setProcessDefaults()

process.emitWarning('fixture warning')
