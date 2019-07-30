
import boom = require('@hapi/boom')

const routes = [
  {
    method: ['GET'],
    path: '/coffee',
    handler: () => boom.teapot(),
  }, {
    method: ['GET'],
    path: '/tea',
    handler: () => boom.teapot('I\'m a server, not a teapot!'),
  },
]

export { routes }
