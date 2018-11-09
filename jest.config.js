'use strict'

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ["clover", "json", "lcov", "text", "text-summary" ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
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
  projects: [
    'packages/*'
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.(ts|tsx)'
  ],
  verbose: true
}
