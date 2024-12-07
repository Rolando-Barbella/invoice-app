module.exports = {
  // preset: 'react-native',
  // setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^./generated/client$': '<rootDir>/src/api/generated/client.d.ts'
  }
}
