export default {
  testEnvironment: 'node',
  testTimeout: 60000,
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.ts',
    '<rootDir>/tests/integration/**/*.int.test.ts',
  ],
  modulePaths: ['<rootDir>/node_modules'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowJs: true,
        esModuleInterop: true,
        strict: false,
        noImplicitAny: false,
        types: ['node', 'jest'],
      }
    }],
  },
  clearMocks: true,
};