'use strict'

import { setProcessDefaults } from '../../../../src/lib/process-defaults'

setProcessDefaults()

async function crash() {
  return await new Promise((resolve, reject) => {
    resolve('click')
    reject(new Error('boom'))
  })
}
crash().then(() => { })
