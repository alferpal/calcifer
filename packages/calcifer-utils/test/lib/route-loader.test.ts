'use strict'

import * as innerLib from '../../src/lib/route-loader'
import * as exported from '../../src'
import path from 'path'

describe('When getRoutes is required directly:', () => {
  test('getRoutes should be defined and be a function', () => {
    expect(innerLib.getRoutes).toBeDefined()
    expect(typeof innerLib.getRoutes).toBe('function')
  })
})

describe('When getRoutes is required from outside:', () => {
  test('getRoutes should be defined and be a function', () => {
    expect(exported.getRoutes).toBeDefined()
    expect(typeof exported.getRoutes).toBe('function')
  })
})

describe('getRoutes', () => {
  test('should  return an array with 4 routes from the fixtures folder ', async () => {
    const routesPath = path.join(__dirname, '../../test/lib/fixtures/route-loader')
    const routes = await innerLib.getRoutes(routesPath, './**/*.ts')

    expect(routes.length).toEqual(4)

    routes.map((route) => {
      expect(route.method).toBeDefined
      expect(typeof route.method[0]).toEqual('string')

      expect(route.path).toBeDefined
      expect(typeof route.path).toEqual('string')

      expect(route.handler).toBeDefined
      expect(typeof route.handler).toEqual('function')
    })
  })
})
