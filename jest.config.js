module.exports = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^./generated/client$': '<rootDir>/src/api/generated/client.d.ts'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.[jt]sx?$': 'babel-jest', // Use babel-jest for JavaScript/JSX files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library/react-native)/)',
  ],
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
}
