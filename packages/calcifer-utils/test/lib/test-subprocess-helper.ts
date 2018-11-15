'use strict'

import * as innerLib from '../../src/lib/test-subprocess-helper'
import * as exported from '../../src'

describe('When test-subprocess-helper is required directly:', () => {
  test('execFileHelper should be defined and be a function', () => {
    expect(innerLib.execFileHelper).toBeDefined()
    expect(typeof innerLib.execFileHelper).toBe('function')
  })

  test('forkHelper should be defined and be a function', () => {
    expect(innerLib.forkHelper).toBeDefined()
    expect(typeof innerLib.forkHelper).toBe('function')
  })

  test('spawnHelper should be defined and be a function', () => {
    expect(innerLib.spawnHelper).toBeDefined()
    expect(typeof innerLib.execFileHelper).toBe('function')
  })
})

describe('When test-subprocess-helper is required from outside:', () => {
  test('execFileHelper should be defined and be a function', () => {
    expect(exported.testHelpers.execFileHelper).toBeDefined()
    expect(typeof exported.testHelpers.execFileHelper).toBe('function')
  })

  test('forkHelper should be defined and be a function', () => {
    expect(exported.testHelpers.forkHelper).toBeDefined()
    expect(typeof exported.testHelpers.forkHelper).toBe('function')
  })

  test('spawnHelper should be defined and be a function', () => {
    expect(exported.testHelpers.spawnHelper).toBeDefined()
    expect(typeof exported.testHelpers.execFileHelper).toBe('function')
  })
})

describe('execFileHelper', () => {
  test('should spawn a new file calling execFile ', (done) => {
    const child = innerLib.execFileHelper(
      'test/lib/fixtures/test-subprocess-helper/test-subprocess.ts',
      (error, stdout, stderr) => {
        const output = JSON.parse(stdout.split('\n')[0])
        expect(error).toBeNull

        expect(output.level).toEqual(30)
        expect(output.msg).toEqual('test-subprocess')

        expect(stderr).toEqual('')

        setTimeout(done, 256)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(0)
    })
  })
})

describe('execFileHelper', () => {
  test('should spawn a new file calling execFile ', (done) => {
    const child = innerLib.execFileHelper(
      'test/lib/fixtures/test-subprocess-helper/test-subprocess.ts',
      (error, stdout, stderr) => {
        const split = stdout.split('\n')
        const firstLine = JSON.parse(split[0])
        const secondLine = JSON.parse(split[1])
        expect(error).toBeNull

        expect(firstLine.level).toEqual(30)
        expect(firstLine.msg).toEqual('test-subprocess')

        expect(secondLine.level).toEqual(30)
        expect(secondLine.msg).toEqual('__execFileHelper')

        expect(stderr).toEqual('')

        setTimeout(done, 8)
      })

    child.on('exit', (code) => {
      expect(code).toEqual(0)
    })
  })
})

describe('forkHelper', () => {
  test('should spawn a new file calling fork ', (done) => {
    const child = innerLib.forkHelper(
      'test/lib/fixtures/test-subprocess-helper/test-subprocess.ts',
    )

    let stderr = ''
    let stdout = ''

    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })

    child.stdout.on('data', (chunk) => {
      stdout += chunk
    })

    child.on('exit', (code) => {
      const split = stdout.split('\n')
      const firstLine = JSON.parse(split[0])
      const secondLine = JSON.parse(split[1])

      expect(firstLine.level).toEqual(30)
      expect(firstLine.msg).toEqual('test-subprocess')

      expect(secondLine.level).toEqual(30)
      expect(secondLine.msg).toEqual('__forkHelper')

      expect(stderr).toEqual('')

      expect(code).toEqual(0)

      done()
    })
  })
})

describe('spawnHelper', () => {
  test('should spawn a new file calling spawn ', (done) => {
    const child = innerLib.forkHelper(
      'test/lib/fixtures/test-subprocess-helper/test-subprocess.ts',
    )

    let stderr = ''
    let stdout = ''

    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })

    child.stdout.on('data', (chunk) => {
      stdout += chunk
    })

    child.on('exit', (code) => {
      const split = stdout.split('\n')
      const firstLine = JSON.parse(split[0])
      const secondLine = JSON.parse(split[1])

      expect(firstLine.level).toEqual(30)
      expect(firstLine.msg).toEqual('test-subprocess')

      expect(secondLine.level).toEqual(30)
      expect(secondLine.msg).toEqual('__spawnHelper')

      expect(stderr).toEqual('')

      expect(code).toEqual(0)

      done()
    })
  })
})
