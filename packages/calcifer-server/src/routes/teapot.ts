'use strict'

import boom = require('boom')

const routes = [
  {
    method: ['GET'],
    path: '/coffee',
    handler: function coffeeHandler() {
      return boom.teapot()
    },
  }, {
    method: ['GET'],
    path: '/tea',
    handler: function teaHandler() {
      return boom.teapot('I\'m a server, not a teapot!')
    },
  },
]

export { routes }
