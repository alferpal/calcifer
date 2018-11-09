'use strict'

const routes = [
  {
    method: ['GET'],
    path: '/2',
    handler() {
      return 2
    },
  }, {
    method: ['GET'],
    path: '/3',
    handler() {
      return 3
    },
  },
]

export { routes }
