
import path from 'path'
import * as innerLib from '../../src/lib/route-loader'
import * as exported from '../../src'

describe('when route-loader is required directly:', () => {
  it('getRoutes should be defined and be a function', () => {
    expect.assertions(2)

    expect(innerLib.getRoutes).toBeDefined()
    expect(typeof innerLib.getRoutes).toStrictEqual('function')
  })
})

describe('when route-loader is required from outside:', () => {
  it('getRoutes should be defined and be a function', () => {
    expect.assertions(2)

    expect(exported.getRoutes).toBeDefined()
    expect(typeof exported.getRoutes).toStrictEqual('function')
  })
})

describe('getRoutes', () => {
  it('should return an array with 4 routes from the fixtures folder ', async () => {
    expect.assertions(25)

    const routesPath = path.join(__dirname, '../../test/lib/fixtures/route-loader')
    const routes = await innerLib.getRoutes(routesPath)

    expect(routes).toHaveLength(4)

    routes.forEach(route => {
      expect(route.method).toBeDefined()
      expect(typeof route.method[0]).toStrictEqual('string')

      expect(route.path).toBeDefined()
      expect(typeof route.path).toStrictEqual('string')

      expect(route.handler).toBeDefined()
      expect(typeof route.handler).toStrictEqual('function')
    })
  })
})
