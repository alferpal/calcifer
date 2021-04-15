
import { logger } from '@alferpal/calcifer-utils'
import nock from 'nock'
import * as SIA from 'set-interval-async'
import * as SIAD from 'set-interval-async/dynamic'

import * as jwtValidator from '../jwt-validator'

describe('jwt-validator', () => {
  describe('init', () => {
    let failInvalid = false

    beforeEach(() => {
      let authFirstCall = true
      let getFirstCall = true

      nock('http://auth.calcifer')
        .persist()
        .post('/login')
        .reply(() => {
          if (authFirstCall) {
            authFirstCall = false

            return [401]
          }

          return [200, JSON.stringify({ token: 'token' })]
        })
        .get('/invalid-tokens')
        .reply(() => {
          if (getFirstCall || failInvalid) {
            getFirstCall = false

            return [401]
          }

          return [200, JSON.stringify({ invalidTokens: ['123'] })]
        })
    })

    afterEach(nock.cleanAll)
    it('should set interval on first call, and clear and reset after', async () => {
      expect.assertions(4)

      failInvalid = false

      const clearSpy = jest.spyOn(SIA, 'clearIntervalAsync')
      const setSpy = jest.spyOn(SIAD, 'setIntervalAsync')

      await jwtValidator.init()

      expect(clearSpy).toHaveBeenCalledTimes(0)
      expect(setSpy).toHaveBeenCalledTimes(1)

      await jwtValidator.init()

      expect(clearSpy).toHaveBeenCalledTimes(1)
      expect(setSpy).toHaveBeenCalledTimes(2)

      clearSpy.mockRestore()
      setSpy.mockRestore()
    })

    it('should not throw even if errors occur', async () => {
      expect.assertions(2)

      failInvalid = true

      const logSpy = jest.spyOn(logger, 'error')

      await jwtValidator.init()

      await jwtValidator.init()

      expect(logSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('validateJWTHandler', () => {
    beforeAll(async () => {
      nock('http://auth.calcifer')
        .persist()
        .post('/login')
        .reply(200, JSON.stringify({ token: 'token' }))
        .get('/invalid-tokens')
        .reply(200, JSON.stringify({ invalidTokens: ['123'] }))

      await jwtValidator.init()

      nock.cleanAll()
    })

    it('should accept tokens not in invalid list', () => {
      expect.assertions(1)

      const decoded = {
        tokenId: '321',
        login: 'admin',
        roles: ['test'],
      }

      const { isValid } = jwtValidator.validateJWTHandler(decoded)

      expect(isValid).toStrictEqual(true)
    })

    it('should reject tokens in invalid list', () => {
      expect.assertions(1)

      const decoded = {
        tokenId: '123',
        login: 'admin',
        roles: ['test'],
      }

      const { isValid } = jwtValidator.validateJWTHandler(decoded)

      expect(isValid).toStrictEqual(false)
    })
  })
})
