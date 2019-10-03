const config = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true,
  },
  globals: {
    document: true,
    fetch: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['internals/**/*.js', 'client/**/stories.js'],
      },
    ],
    'import/prefer-default-export': 0,
    'no-else-return': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: true,
        assignment: true,
        return: true,
      },
    ],
    'react/no-unused-prop-types': 0,
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
};

module.exports = config;
