'use strict'

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageReporters: [
    'clover',
    'html',
    'json',
    'lcov',
    'text',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 83,
      functions: 83,
      lines: 83,
      statements: 83
    },
  },
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
  testEnvironment: 'node',
  testMatch: [
    '**/*.test.(ts|tsx)'
  ],
  verbose: true
}
