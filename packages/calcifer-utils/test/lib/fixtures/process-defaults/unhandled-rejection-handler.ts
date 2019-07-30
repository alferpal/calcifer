
import { setProcessDefaults } from '../../../../src/lib/process-defaults'

setProcessDefaults()

// eslint-disable-next-line no-new
new Promise((_, reject) => {
  reject(new Error('catch this!'))
})
