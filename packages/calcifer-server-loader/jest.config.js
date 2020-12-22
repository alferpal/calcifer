
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
  setupFilesAfterEnv: ['./jest-setup.js'],
}

config.coverageThreshold['./src/server-loader.ts'] = {
  branches: 75,
  functions: 100,
  lines: 96.55,
  statements: 96.67,
}

module.exports = config
