
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
  setupFilesAfterEnv: ['./jest-setup.js'],
}

config.coverageThreshold['./src/server-loader.ts'] = {
  branches: 86.67,
  functions: 100,
  lines: 97.5,
  statements: 97.5,
}

module.exports = config
