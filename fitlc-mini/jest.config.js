module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  moduleDirectories: ['node_modules', '..'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  // Mock wx API for page tests
  globalConfig: {
    wx: {
      request: jest.fn(),
      redirectTo: jest.fn(),
      navigateTo: jest.fn(),
      getStorageSync: jest.fn(),
      setStorageSync: jest.fn()
    }
  }
};