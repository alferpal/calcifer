'use strict'

const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase
}

config.coverageThreshold['./src/lib/process-defaults'] = {
  branches: 0,
  functions: 0,
  lines: 16.67,
  statements: 16.67
}

module.exports=config
