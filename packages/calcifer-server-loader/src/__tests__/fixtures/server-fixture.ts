import { getServer } from '../../server-loader'

const isMain = Object.keys(require.main?.exports ?? {}).length > 0

async function initServer() {
  const server = await getServer({
    routesPath: '',
    initTokenValidation: false,
    plugins: [{
      plugin: {
        name: 'myPlugin',
        version: '1.0.0',
        async register(s) {
          // Create a route for example

          s.route({
            method: 'GET',
            path: '/test',
            handler() {
              return 'hello, world'
            },
          })
        },
      },
    }],
  })

  if (isMain) {
    await server.start()

    server.logger.info(`Server running at: ${server.info.uri}`)
  }
}

if (isMain) {
  initServer()
}

export { initServer }
