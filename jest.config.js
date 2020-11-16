'use strict'

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage-jest',
  coverageReporters: [
    'clover',
    'html',
    'json',
    'lcov',
    'text',
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
      tsconfig: 'test/tsconfig.json'
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
