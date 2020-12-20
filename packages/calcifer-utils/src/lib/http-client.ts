import hyperid from 'hyperid'
import got from 'got'

const idGenerator = hyperid()

function getClient() {
  return got.extend({
    hooks: {
      beforeRequest: [(options) => {
        // eslint-disable-next-line no-param-reassign
        options.headers['x-request-id'] = options.headers['x-request-id'] ?? idGenerator()
      }],
    },
  })
}

export { getClient }
