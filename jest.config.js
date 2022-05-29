module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js'
  ],
  coveragePathIgnorePatterns: ['.json', '__mocks__', '__helpers__'],
  modulePathIgnorePatterns: ['lib']
};
