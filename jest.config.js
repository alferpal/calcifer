'use strict'

module.exports = {
  bail: true,
  collectCoverage: false,
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  preset: 'ts-jest',
  projects: [
    'packages/*'
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.(ts|tsx)'
  ],
  verbose: true
}
