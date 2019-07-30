const routes = [
  {
    method: ['GET'],
    path: '/0',
    handler() {
      return 0
    },
  }, {
    method: ['GET'],
    path: '/1',
    handler() {
      return 1
    },
  },
]

export { routes }
