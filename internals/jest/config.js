const config = {
  collectCoverageFrom: [
    '{server,client}/**/*.js',
    '!{server,client}/**/*.test.js',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  rootDir: '../../',
  roots: ['<rootDir>/server', '<rootDir>/client'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testRegex: '__tests__/.*\\.test\\.js$',
  globalSetup: '<rootDir>/internals/jest/globalSetup.js',
  globalTeardown: '<rootDir>/internals/jest/globalTeardown.js',
  setupFiles: ['<rootDir>/internals/jest/setup.js'],
};

module.exports = config;
