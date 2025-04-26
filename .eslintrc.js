// https://docs.expo.dev/guides/using-eslint/
// const { defineConfig } = require('eslint/config');
// const expoConfig = require('eslint-config-expo/flat');
// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  rules: {
    // Ignore unused variables with _ prefix
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
