'use strict'

import * as innerLib from '../../src/lib/route-loader'
import * as exported from '../../src'
import path from 'path'

describe('When route-loader is required directly:', () => {
  test('getRoutes should be defined and be a function', () => {
    expect(innerLib.getRoutes).toBeDefined()
    expect(typeof innerLib.getRoutes).toEqual('function')
  })
})

describe('When route-loader is required from outside:', () => {
  test('getRoutes should be defined and be a function', () => {
    expect(exported.getRoutes).toBeDefined()
    expect(typeof exported.getRoutes).toEqual('function')
  })
})

describe('getRoutes', () => {
  test('should return an array with 4 routes from the fixtures folder ', async () => {
    const routesPath = path.join(__dirname, '../../test/lib/fixtures/route-loader')
    const routes = await innerLib.getRoutes(routesPath)

    expect(routes.length).toEqual(4)

    routes.forEach((route) => {
      expect(route.method).toBeDefined
      expect(typeof route.method[0]).toEqual('string')

      expect(route.path).toBeDefined
      expect(typeof route.path).toEqual('string')

      expect(route.handler).toBeDefined
      expect(typeof route.handler).toEqual('function')
    })
  })
})
