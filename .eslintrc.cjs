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
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  settings: {
    sourceType: 'module',
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'linebreak-style': 'off',
    'no-console': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        bracketSpacing: true,
      },
    ],
    'react/prop-types': 'off',
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
          ['^.+\\.less$'],
        ],
      },
    ],
    'simple-import-sort/exports': 2,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/named': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
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
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@tanstack/query/exhaustive-deps': 'off',
    '@tanstack/query/no-deprecated-options': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    "react/self-closing-comp": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
  },
};
