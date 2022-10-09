/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    'airbnb-base',
  ],
  ignorePatterns: [
    'externals',
    'dist',
    '/*.js',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-alert': 'off',
    'vue/multi-word-component-names': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'space-before-function-paren': ['error', 'always'],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/first-attribute-linebreak': 'off',
    'vue/html-indent': ['error', 2, { alignAttributesVertically: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
