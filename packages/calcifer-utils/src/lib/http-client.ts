import hyperid from 'hyperid'
import got, { ExtendOptions } from 'got'

const idGenerator = hyperid()

function getClient(options: ExtendOptions = {}) {
  return got.extend(got.mergeOptions(options, {
    hooks: {
      beforeRequest: [(requestOptions) => {
        // eslint-disable-next-line no-param-reassign
        requestOptions.headers['x-request-id'] = requestOptions.headers['x-request-id'] ?? idGenerator()
      }],
    },
  }))
}

export { getClient }
