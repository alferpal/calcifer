import path from 'path'
import { describe, expect, it } from '@jest/globals'

import * as innerLib from '../route-loader'

describe('getRoutes', () => {
  it('should return an array with 4 routes from the fixtures folder', async () => {
    expect.assertions(25)

    const routesPath = path.join(__dirname, './fixtures/route-loader')
    const routes = await innerLib.getRoutes(routesPath)

    expect(routes).toHaveLength(4)

    routes.forEach((route) => {
      expect(route.method).toBeDefined()
      expect(typeof route.method[0]).toStrictEqual('string')

      expect(route.path).toBeDefined()
      expect(typeof route.path).toStrictEqual('string')

      expect(route.handler).toBeDefined()
      expect(typeof route.handler).toStrictEqual('function')
    })
  })

  it('should return an array with 4 routes from the fixtures folder, first without prefix when not set, then with prefix when set', async () => {
    expect.assertions(10)

    const prefix = '/api'

    const routesPath = path.join(__dirname, './fixtures/route-loader')
    const routes = await innerLib.getRoutes(routesPath)

    expect(routes).toHaveLength(4)

    routes.forEach((route) => {
      expect(route.path.startsWith(prefix)).toStrictEqual(false)
    })

    const prefixedRoutes = await innerLib.getRoutes(routesPath, prefix)

    expect(prefixedRoutes).toHaveLength(4)

    prefixedRoutes.forEach((route) => {
      expect(route.path.startsWith(prefix)).toStrictEqual(true)
    })
  })
})
