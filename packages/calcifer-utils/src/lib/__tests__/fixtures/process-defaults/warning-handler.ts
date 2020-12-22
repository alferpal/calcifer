import { setProcessDefaults } from '../../../process-defaults'

setProcessDefaults()

process.emitWarning('fixtureDesignedWarning')

setTimeout(process.exit, 16)
