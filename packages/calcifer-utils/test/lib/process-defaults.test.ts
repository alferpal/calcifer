'use strict'

import * as innerLib from '../../src/lib/process-defaults'
import * as exported from '../../src'
import { execFile } from 'child_process'

const nycOptions = [
  '--check-coverage',
  'false',
  './node_modules/.bin/ts-node',
  '--project',
  'test/tsconfig.json',
]

const nycPath = './node_modules/.bin/nyc'

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

describe('Environment Defaults', () => {
  test('should be set once setProcessDefaults is called ', (done) => {
    const child = execFile(
      nycPath, [
        ...nycOptions,
        'test/lib/fixtures/process-defaults/environment-defaults.ts',
      ],
      (error, stdout, stderr) => {
        const output = stdout.split('\n')
        expect(error).toBeNull

        expect(output[0]).toEqual('128')

        expect(stderr).toEqual('')

        setTimeout(done, 64)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(0)
    })
  })
})

describe('Multiple Resolves', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      nycPath, [
        ...nycOptions,
        'test/lib/fixtures/process-defaults/multiple-resolves-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout.split('\n')[0])
        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('mulipleResolves'))

        expect(stderr).toEqual('')

        setTimeout(done, 64)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Uncaught Exception', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      nycPath, [
        ...nycOptions,
        'test/lib/fixtures/process-defaults/uncaught-exception-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout.split('\n')[0])

        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('catch this!'))
        expect(output.stack).toBeDefined
        expect(output.type).toBe('Error')

        expect(stderr).toEqual('')

        setTimeout(done, 64)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Unhandled Rejection', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      nycPath, [
        ...nycOptions,
        'test/lib/fixtures/process-defaults/unhandled-rejection-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout.split('\n')[0])

        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(60)
        expect(output.msg.includes('catch this!'))
        expect(output.stack).toBeDefined
        expect(output.type).toBe('Error')

        expect(stderr).toEqual('')

        setTimeout(done, 64)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(1)
    })
  })
})

describe('Warnings', () => {
  test('should be handled once the handler is installed ', (done) => {
    const child = execFile(
      nycPath, [
        ...nycOptions,
        'test/lib/fixtures/process-defaults/warning-handler.ts',
      ],
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout.split('\n')[0])
        expect(error).toBeNull

        expect(output.calciferName).toBeDefined
        expect(output.calciferType).toBeDefined
        expect(output.level).toEqual(40)
        expect(output.msg.includes('fixtureDesignedWarning'))

        expect(stderr.includes('fixtureDesignedWarning'))

        setTimeout(done, 64)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(0)
    })
  })
})
