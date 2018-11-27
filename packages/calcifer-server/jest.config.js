'use strict'

const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase
}

config.coverageThreshold['./src/server'] = {
  branches: 50,
  functions: 83,
  lines: 81.82,
  statements: 82.61
}

module.exports=config
