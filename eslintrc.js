module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: 'error',
    'no-empty-function': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': 'error',
    'key-spacing': 'error',
    'comma-spacing': 'error',
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'space-in-parens': 'error',
    'space-unary-ops': 'error',
    'no-floating-decimal': 'error',
    'no-use-before-define': 'error',
    camelcase: 'error'
  }    
};