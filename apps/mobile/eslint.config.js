// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const baseConfig = require('../../eslint.base.cjs');

module.exports = defineConfig([
  ...baseConfig,
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
