module.exports = {
  setupFilesAfterEnv: ['./jest-setup.ts'],
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^./generated/client$': '<rootDir>/src/api/generated/client.d.ts'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library/react-native)/)',
  ],
  testEnvironment: 'jsdom',
}
