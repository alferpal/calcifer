module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage-jest',
  coveragePathIgnorePatterns: ['fixtures'],
  coverageReporters: [
    'clover',
    'html',
    'json',
    'lcov',
    'text',
    'text-summary'
  ],
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
      tsconfig: 'tsconfig-test.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  verbose: true,
}
