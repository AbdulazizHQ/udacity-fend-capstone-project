// From https://github.com/linesh-simplicity/eslint-config-udacity


// eslint-disable-next-line no-undef
module.exports = {
   env: {
      browser: true,
      es6: true,
      jquery: true,
      jasmine: true,
      node: true,
   },
   parserOptions: {
      ecmaVersion: 11
   },
   plugins: [
      'import',
   ],
   rules: {
      'no-trailing-spaces': 'error',
      indent: ['warn', 3],
      'unicode-bom': ['error', 'never'],
      'no-warning-comments': 'warn',
      semi: 'error',
      'no-extra-semi': 'error',
      'no-new-wrappers': 'error',
      'guard-for-in': 'error',
      'no-multi-str': 'error',
      'no-array-constructor': 'error',
      'no-new-object': 'error',
      camelcase: 'error',
      'brace-style': 'error',
      'object-curly-spacing': 'error',
      'array-bracket-spacing': 'error',
      quotes: ['error', 'single'],
      'no-undef': 'warn',
   }
};
