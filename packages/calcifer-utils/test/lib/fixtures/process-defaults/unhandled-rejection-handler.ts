'use strict'

import { setProcessDefaults } from '../../../../src/lib/process-defaults'

setProcessDefaults()

new Promise((_, reject) => {
  reject(new Error('catch this!'))
})
