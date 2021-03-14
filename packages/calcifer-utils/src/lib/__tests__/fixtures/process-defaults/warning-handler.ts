import { setProcessDefaults } from '../../../process-defaults'

setProcessDefaults()

process.emitWarning('fixtureDesignedWarning')

setTimeout(() => {
  // eslint-disable-next-line no-process-exit
  process.exit()
}, 16)
