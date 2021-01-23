import * as CalciferTypes from '@alferpal/calcifer-types'
import { describe, expect, it } from '@jest/globals'

import * as exported from '../..'
import * as innerLib from '../has-role'

describe('when has-role is required directly', () => {
  describe('hasRole', () => {
    it('should be defined', () => {
      expect.assertions(1)

      expect(innerLib.hasRole).toBeDefined()
    })

    it('and be function', () => {
      expect.assertions(1)

      expect(typeof innerLib.hasRole).toStrictEqual('function')
    })
  })
})

describe('when has-role is required from outside', () => {
  it('hasRole should be defined', () => {
    expect.assertions(1)

    expect(exported.hasRole).toBeDefined()
  })
  it('and be a function', () => {
    expect.assertions(1)

    expect(typeof exported.hasRole).toStrictEqual('function')
  })
})

describe('hasRole', () => {
  it('should return false for users with no permissions', () => {
    expect.assertions(2)

    const user: CalciferTypes.User.UserAuth = {
      login: 'test',
      roles: [],
      tokenId: '1',
    }

    expect(exported.hasRole(user, 'whatever')).toStrictEqual(false)

    const anotherUsr: any = { login: 'testing' }

    expect(exported.hasRole(anotherUsr, 'whatever')).toStrictEqual(false)
  })

  it('should return false for users not having the specified role', () => {
    expect.assertions(1)

    const user: CalciferTypes.User.UserAuth = {
      login: 'test',
      roles: ['whatever'],
      tokenId: '1',
    }

    expect(exported.hasRole(user, 'tests')).toStrictEqual(false)
  })

  it('should return true for users with the right permissions', () => {
    expect.assertions(1)

    const user: CalciferTypes.User.UserAuth = {
      login: 'test',
      roles: ['tests'],
      tokenId: '1',
    }

    expect(exported.hasRole(user, 'tests')).toStrictEqual(true)
  })

  it('should return true for admins', () => {
    expect.assertions(1)

    const user: CalciferTypes.User.UserAuth = {
      login: 'test',
      roles: ['admin'],
      tokenId: '1',
    }

    expect(exported.hasRole(user, 'whatever')).toStrictEqual(true)
  })
})
