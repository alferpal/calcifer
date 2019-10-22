import Boom from '@hapi/boom'

import { prepareServer, server } from '../../src/server'

describe('teapot tests', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    await prepareServer()
    await server.initialize()
  })

  describe('about the /coffee route', () => {
    it('should return a 418 error', async () => {
      expect.assertions(3)

      const options = {
        method: 'GET',
        url: '/coffee',
      }

      const response = await server.inject(options)
      const payload: Boom.Payload = JSON.parse(response.payload)

      expect(payload.statusCode).toStrictEqual(418)
      expect(payload.message).toStrictEqual('I\'m a teapot')
      expect(payload.error).toStrictEqual(payload.message)
    })
  })

  describe('about the /tea route', () => {
    it('should return a 418 error with a custom message', async () => {
      expect.assertions(3)

      const options = {
        method: 'GET',
        url: '/tea',
      }

      const response = await server.inject(options)

      const payload: Boom.Payload = JSON.parse(response.payload)

      expect(payload.statusCode).toStrictEqual(418)
      expect(payload.message).toStrictEqual('I\'m a server, not a teapot!')
      expect(payload.error).not.toStrictEqual(payload.message)
    })
  })
})
