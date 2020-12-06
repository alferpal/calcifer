
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
}

config.coverageThreshold['./src/lib/process-defaults'] = {
  branches: 0,
  functions: 0,
  lines: 18.75,
  statements: 18.75,
}

module.exports = config
