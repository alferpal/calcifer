
import * as innerLib from '../../src/lib/log'
import * as exported from '../../src'

describe('when log is required directly:', () => {
  describe('logger', () => {
    it('should be defined', () => {
      expect.assertions(1)

      expect(innerLib.logger).toBeDefined()
    })

    it('and have a debug function', () => {
      expect.assertions(1)

      expect(typeof innerLib.logger.debug).toStrictEqual('function')
    })

    it('and not have a whatever function', () => {
      expect.assertions(1)

      expect(typeof innerLib.logger.whatever).toStrictEqual('undefined')
    })
  })

  describe('finalLogger', () => {
    it('should be defined', () => {
      expect.assertions(1)

      expect(innerLib.logger).toBeDefined()
    })

    it('and have a debug function', () => {
      expect.assertions(1)

      expect(typeof innerLib.finalLogger.debug).toStrictEqual('function')
    })

    it('and not have a whatever function', () => {
      expect.assertions(1)

      expect(typeof innerLib.finalLogger.whatever).toStrictEqual('undefined')
    })
  })
})

describe('when log is required from outside', () => {
  it('logger should be defined', () => {
    expect.assertions(1)

    expect(exported.logger).toBeDefined()
  })
  it('and have a debug function', () => {
    expect.assertions(1)

    expect(typeof exported.logger.debug).toStrictEqual('function')
  })
  it('and not have a whatever function', () => {
    expect.assertions(1)

    expect(typeof exported.logger.whatever).toStrictEqual('undefined')
  })
  it('finalLogger should not be defined', () => {
    expect.assertions(1)

    expect(Object.keys(exported)).not.toContain('finalLogger')
  })
})
