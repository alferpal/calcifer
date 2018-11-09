'use strict'

// Funny / nonsensical route just to test that
// this API in fact loads multiple routes from multiple files

import boom from 'boom'

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
