
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
}

config.coverageThreshold['./src/server-loader.ts'] = {
  branches: 66.67,
  functions: 100,
  lines: 93.33,
  statements: 93.75,
}

module.exports = config
