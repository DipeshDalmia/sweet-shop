module.exports = {
  testEnvironment: 'node',

  // Run MongoMemoryServer + mongoose setup
  setupFilesAfterEnv: ['<rootDir>/src/tests/testSetup.js'],

  testMatch: ['**/tests/**/*.test.js'],

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/tests/'
  ],

  testTimeout: 30000, // prevents timeout issues
  //runInBand: true,    // prevents parallel DB connections
  verbose: true
};
