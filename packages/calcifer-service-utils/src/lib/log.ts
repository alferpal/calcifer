'use strict'

import * as appUtils from '@alferpal/calcifer-app-utils'

function getLog(name: string = '', type: string = 'service') {

  return appUtils.getLogger(name, type)
}

export { getLog }
