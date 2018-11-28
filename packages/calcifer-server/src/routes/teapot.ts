'use strict'

import boom = require('boom')

const routes = [
  {
    method: ['GET'],
    path: '/coffee',
    handler: () => {
      return boom.teapot()
    },
  }, {
    method: ['GET'],
    path: '/tea',
    handler: () => {
      return boom.teapot('I\'m a server, not a teapot!')
    },
  },
]

export { routes }
