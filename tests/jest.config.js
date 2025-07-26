module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setup/globalSetup.js'],
  testMatch: ['<rootDir>/integration/**/*.test.js'],
  collectCoverageFrom: [
    '../src/**/*.js',
    '!../src/config/**',
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000
}; 