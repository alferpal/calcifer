'use strict'

import { setProcessDefaults } from '../../../../src/lib/process-defaults'

process.env.UV_THREADPOOL_SIZE = '128'

setProcessDefaults()

console.log(process.env.UV_THREADPOOL_SIZE)
