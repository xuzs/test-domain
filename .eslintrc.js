module.exports = {
  root: true,
  extends: ['react-app', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'object-shorthand': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true,
      },
    ],

    'import/no-cycle': 'error',
    // jsx 新版本支持
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  globals: {},
};
