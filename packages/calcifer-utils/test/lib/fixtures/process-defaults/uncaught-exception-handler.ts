'use strict'

import { setProcessDefaults } from '../../../../src/lib/process-defaults'

setProcessDefaults()

throw new Error('catch this!')
