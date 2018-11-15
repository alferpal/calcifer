'use strict'

import { logger } from './lib/log'
import { setProcessDefaults } from './lib/process-defaults'
import { execFileHelper, forkHelper, spawnHelper } from './lib/test-subprocess-helper'

const testHelpers = {
  execFileHelper,
  forkHelper,
  spawnHelper,
}

export {
  logger,
  setProcessDefaults,
  testHelpers,
}
