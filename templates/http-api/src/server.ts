import { getServer } from '@alferpal/calcifer-server-loader'

const isMain = Object.keys(require.main?.exports ?? {}).length > 0

const port = process.env.PORT
  ? process.env.PORT
  : 0

async function initServer() {
  const server = await getServer({
    /* istanbul ignore next */
    initTokenValidation: process.env.NODE_ENV !== 'test',
    routesPath: __dirname,
    port,
  })

  if (isMain) {
    await server.start()

    server.logger.info(`Server running at: ${server.info.uri}`)
  }

  return server
}

if (isMain) {
  initServer()
}

export { initServer }
