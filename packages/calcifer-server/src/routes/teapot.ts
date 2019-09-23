
import Boom from '@hapi/boom'

const routes = [
  {
    method: ['GET'],
    path: '/coffee',
    handler: () => Boom.teapot(),
  }, {
    method: ['GET'],
    path: '/tea',
    handler: () => Boom.teapot('I\'m a server, not a teapot!'),
  },
]

export { routes }
