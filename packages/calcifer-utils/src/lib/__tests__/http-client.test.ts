import nock from 'nock'

import * as exported from '../..'
import * as innerLib from '../http-client'

describe('when http-client is required directly', () => {
  describe('getClient', () => {
    it('should be defined', () => {
      expect.assertions(1)

      expect(innerLib.getClient).toBeDefined()
    })

    it('and be function', () => {
      expect.assertions(1)

      expect(typeof innerLib.getClient).toStrictEqual('function')
    })
  })
})

describe('when http-client is required from outside', () => {
  it('hasRole should be defined', () => {
    expect.assertions(1)

    expect(exported.getClient).toBeDefined()
  })
  it('and be a function', () => {
    expect.assertions(1)

    expect(typeof exported.getClient).toStrictEqual('function')
  })
})

describe('getClient', () => {
  it('should return an http client', () => {
    expect.assertions(4)

    const client = exported.getClient()

    expect(typeof client.delete).toStrictEqual('function')
    expect(typeof client.get).toStrictEqual('function')
    expect(typeof client.post).toStrictEqual('function')
    expect(typeof client.put).toStrictEqual('function')
  })

  it('the http client should add x-request-id header if not set', async () => {
    expect.assertions(1)

    const client = exported.getClient()

    nock('http://example.com').get('/test').reply(function testHeaders() {
      expect(this.req.headers).toMatchObject({ 'x-request-id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })

      return [200, 'test']
    })

    await client.get('http://example.com/test')
  })

  it('the http client should keep x-request-id header if set', async () => {
    expect.assertions(1)

    const client = exported.getClient()

    nock('http://example.com').get('/test').reply(function testHeaders() {
      expect(this.req.headers).toMatchObject({ 'x-request-id': 'test' })

      return [200, 'test']
    })

    await client.get('http://example.com/test', {
      headers: {
        'x-request-id': 'test',
      },
    })
  })
})
