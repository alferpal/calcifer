
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
  lines: 17.65,
  statements: 17.65,
}

module.exports = config
