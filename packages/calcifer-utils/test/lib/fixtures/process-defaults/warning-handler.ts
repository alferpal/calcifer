
import { setProcessDefaults } from '../../../../src/lib/process-defaults'

setProcessDefaults()

process.emitWarning('fixtureDesignedWarning')

setTimeout(process.exit, 16)
