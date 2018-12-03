'use strict'

const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase
}

config.coverageThreshold['./src/server'] = {
  branches: 50,
  functions: 83,
  lines: 83,
  statements: 83
}

module.exports=config
