import got, { ExtendOptions } from 'got'
import { v4 as uuidv4 } from 'uuid'

/**
 * Handler for unhandledRejection
 * Prints the error synchronously and exits the process
 * @param options got options used for creating the client
 * @returns A got instance
 */
function getClient(options: ExtendOptions = {}) {
  return got.extend(got.mergeOptions(options, {
    hooks: {
      beforeRequest: [(requestOptions) => {
        // eslint-disable-next-line no-param-reassign
        requestOptions.headers['x-request-id'] = requestOptions.headers['x-request-id'] ?? uuidv4()
      }],
    },
  }))
}

export { getClient }
