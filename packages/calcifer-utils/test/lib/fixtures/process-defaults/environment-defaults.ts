
import { setProcessDefaults } from '../../../../src/lib/process-defaults'

process.env.UV_THREADPOOL_SIZE = '128'

setProcessDefaults()

// eslint-disable-next-line no-console
console.log(process.env.UV_THREADPOOL_SIZE)
