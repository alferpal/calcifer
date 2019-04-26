'use strict'

import boom = require('@hapi/boom')
import { prepareServer, server } from '../../src/server'

beforeAll(async () => {
  await prepareServer()
  await server.initialize()
})

describe('About the /coffee route', () => {
  test('It should return a 418 error', async () => {
    const options = {
      method: 'GET',
      url: '/coffee',
    }

    const response = await server.inject(options)
    const payload: boom.Payload = JSON.parse(response.payload)

    expect(payload.statusCode).toEqual(418)
    expect(payload.message).toEqual('I\'m a teapot')
    expect(payload.error).toEqual(payload.message)
  })
})

describe('About the /tea route', () => {
  test('It should return a 418 error with a custom message', async () => {
    const options = {
      method: 'GET',
      url: '/tea',
    }

    const response = await server.inject(options)
    const payload: boom.Payload = JSON.parse(response.payload)

    expect(payload.statusCode).toEqual(418)
    expect(payload.message).toEqual('I\'m a server, not a teapot!')
    expect(payload.error).not.toEqual(payload.message)
  })
})
