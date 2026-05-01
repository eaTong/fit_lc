module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  moduleDirectories: ['node_modules', '..'],
  testPathIgnorePatterns: ['/node_modules/', '/test/e2e/'],
  testTimeout: 10000
};