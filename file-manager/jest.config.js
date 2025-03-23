module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  testMatch: ['**/test/**/*.test.ts'], // Match test files
  moduleFileExtensions: ['ts', 'js'], // Recognize .ts and .js files
};