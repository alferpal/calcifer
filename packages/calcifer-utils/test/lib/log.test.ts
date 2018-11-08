'use strict'

import * as innerLib from '../../src/lib/log'
import * as exported from '../../src'

describe('When log is required directly:', () => {
  test('logger should be defined', () => {
    expect(innerLib.logger).toBeDefined()
  })
  test('and have a debug function', () => {
    expect(typeof innerLib.logger.debug).toBe('function')
  })
  test('and not have a whatever function', () => {
    expect(typeof innerLib.logger.whatever).toBe('undefined')
  })
  test('finalLogger should be defined', () => {
    expect(innerLib.logger).toBeDefined()
  })
  test('and have a debug function', () => {
    expect(typeof innerLib.finalLogger.debug).toBe('function')
  })
  test('and not have a whatever function', () => {
    expect(typeof innerLib.finalLogger.whatever).toBe('undefined')
  })
})

describe('When log is required from outside', () => {
  test('logger should be defined', () => {
    expect(exported.logger).toBeDefined()
  })
  test('and have a debug function', () => {
    expect(typeof exported.logger.debug).toBe('function')
  })
  test('and not have a whatever function', () => {
    expect(typeof exported.logger.whatever).toBe('undefined')
  })
  test('finalLogger should not be defined', () => {
    expect(Object.keys(exported).includes('finalLogger')).toBeFalsy()
  })
})
