'use strict'

import * as innerLib from '../../src/lib/process-defaults'
import * as exported from '../../src'
import { execFile } from 'child_process'

describe('When good-defaults is required directly:', () => {
  test('setProcessDefaults should be defined and be a function', () => {
    expect(innerLib.setProcessDefaults).toBeDefined()
    expect(typeof innerLib.setProcessDefaults).toBe('function')
  })
})

describe('When good-defaults is required from outside:', () => {
  test('setProcessDefaults should be defined and be a function', () => {
    expect(exported.setProcessDefaults).toBeDefined()
    expect(typeof exported.setProcessDefaults).toBe('function')
  })
})

describe('Warnings', () => {
  test('should be handled once the handler is installed ', (done) => {
    execFile(
      './node_modules/.bin/ts-node',
      [
        '--project',
        'test/tsconfig.json',
        'test/fixtures/warningHandler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout)
        expect(error).toBeNull
        expect(stderr.includes('fixtureDesignedWarning'))
        expect(output.level).toEqual(40)
        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        done()
      })
  })
})
