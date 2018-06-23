module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    es6: true
  },
  parser: 'typescript-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  }
};