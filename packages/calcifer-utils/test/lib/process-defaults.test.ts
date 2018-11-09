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

describe('Multiple Resolves', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      './node_modules/.bin/ts-node',
      [
        '--project',
        'test/tsconfig.json',
        'test/lib/fixtures/multiple-resolves-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout)
        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('mulipleResolves'))

        expect(stderr).toEqual('')

        setTimeout(done, 1024)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Uncaught Exception', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      './node_modules/.bin/ts-node',
      [
        '--project',
        'test/tsconfig.json',
        'test/lib/fixtures/uncaught-exception-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout)

        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('catch this!'))
        expect(output.stack).toBeDefined
        expect(output.type).toBe('Error')

        expect(stderr).toEqual('')

        setTimeout(done, 1024)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Unhandled Rejection', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      './node_modules/.bin/ts-node',
      [
        '--project',
        'test/tsconfig.json',
        'test/lib/fixtures/unhandled-rejection-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout)

        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('catch this!'))
        expect(output.stack).toBeDefined
        expect(output.type).toBe('Error')

        expect(stderr).toEqual('')

        setTimeout(done, 1024)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Warnings', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      './node_modules/.bin/ts-node',
      [
        '--project',
        'test/tsconfig.json',
        'test/lib/fixtures/warning-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout)
        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(40)
        expect(output.msg.includes('fixtureDesignedWarning'))

        expect(stderr.includes('fixtureDesignedWarning'))

        setTimeout(done, 1024)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(0)
    })
  })
})
