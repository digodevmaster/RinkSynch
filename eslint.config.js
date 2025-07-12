import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    ignores: ['dist/']
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: pluginReactHooks.configs.recommended.rules
  },
  {
    plugins: {
      'react-refresh': pluginReactRefresh
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { 'varsIgnorePattern': '^[A-Z_]' }],
    }
  }
];