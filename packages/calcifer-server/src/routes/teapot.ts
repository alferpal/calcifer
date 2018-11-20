'use strict'

import boom = require('boom')

const routes = [
  {
    method: ['GET'],
    path: '/coffee',
    async handler() {
      return boom.teapot()
    },
  }, {
    method: ['GET'],
    path: '/tea',
    async handler() {
      return boom.teapot('I\'m a server, not a teapot!')
    },
  },
]

export { routes }
