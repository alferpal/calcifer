import { getServer } from '@alferpal/calcifer-server-loader'
import type CalciferTypes from '@alferpal/calcifer-types'

const isMain = Object.keys(require.main?.exports ?? {}).length > 0

const port = process.env.PORT
  ? process.env.PORT
  : 0

async function initServer(): Promise<CalciferTypes.Server.CalciferHapiServer> {
  const server = await getServer({
    /* istanbul ignore next */
    initTokenValidation: process.env.NODE_ENV !== 'test',
    port,
    routesPath: __dirname,
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
