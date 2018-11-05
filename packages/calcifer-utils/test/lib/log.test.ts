'use strict'

import { logger as innerLogger } from '../../src/lib/log'
import { log } from '../../src'

describe('log', () => {
  test('has a debug level', () => {
    expect(typeof innerLogger.debug).toBe('function')
  })

  test('has not a whatever level or function', () => {
    expect(typeof innerLogger.whatever).toBe('undefined')
  })

  test('has a debug level when exported too', () => {
    expect(typeof log.debug).toBe('function')
  })
})
