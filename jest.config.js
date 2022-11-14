module.exports = {
  displayName: 'use-text-mask',
  verbose: true,
  globals: {
    'ts-jest': {
      compiler: "ttypescript",
      tsconfig: './tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
