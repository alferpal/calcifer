'use strict'

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  projects: [
    'packages/*'
  ],
  transform: {
    '.(ts|tsx)': './node_modules/ts-jest/preprocessor.js'
  },
  testMatch: [
    '**/test/**/*.test.(ts|tsx)'
  ],
  testEnvironment: 'node',
  verbose: true
}
