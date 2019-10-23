
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
}

config.coverageThreshold['./src/server'] = {
  branches: 50,
  functions: 83,
  lines: 82.35,
  statements: 83,
}

module.exports = config
