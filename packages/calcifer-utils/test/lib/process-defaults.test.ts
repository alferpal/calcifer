'use strict'

import * as innerLib from '../../src/lib/process-defaults'
import * as exported from '../../src'
import { execFile } from 'child_process'
import * as path from 'path'

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
    console.log(path.join(__dirname, '../..'))
    execFile(
      './node_modules/.bin/ts-node',
      ['--help'],
      { cwd: path.join(__dirname, '../..') },
      (error, stdout, stderr) => {
        if (error) {
          throw error
        }
        console.dir({ error, stdout, stderr }, { colors: true, depth: null })
        done()
      })
  })
})
