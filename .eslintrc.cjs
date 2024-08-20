const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, './src');
const directoriesForAbsImport = fs.existsSync(srcPath)
  ? fs
      .readdirSync(srcPath)
      .filter((file) => fs.lstatSync(path.join(srcPath, file)).isDirectory())
      .join('|')
  : '';

module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['simple-import-sort', 'import', 'react'],
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  rules: {
    'no-console': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          // Packages.
          ['^@?\\w'],
          // Side effect imports.
          ['^\\u0000'],
          // Internal packages.
          [`^(@|${directoriesForAbsImport})(/.*|$)`],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 2,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/named': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    "react/self-closing-comp": "error",
  },
};
