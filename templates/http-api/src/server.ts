import { prepareServer, server } from '@alferpal/calcifer-server-loader'

const isMain = Object.keys(require.main?.exports).length > 0

async function init() {
  await prepareServer({
    routesPath: __dirname,
    validateJWTHandler: () => ({ isValid: true }),
  })

  if (isMain) {
    await server.start()

    server.logger.info(`Server running at: ${server.info.uri}`)
  }
}

if (isMain) {
  init()
}

export { init, server }
