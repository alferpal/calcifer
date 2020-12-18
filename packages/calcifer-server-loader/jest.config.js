
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
}

config.coverageThreshold['./src/server-loader.ts'] = {
  branches: 77.78,
  functions: 100,
  lines: 96.15,
  statements: 96.3,
}

module.exports = config
