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
};

module.exports = config;
