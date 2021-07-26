const generateScopedName = require('./scaffold/generateScopedName');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        corejs: { version: 3, proposals: true },
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // 需要安装 @babel/runtime
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    [
      'react-css-modules',
      {
        exclude: 'node_modules',
        filetypes: {
          '.less': {
            syntax: 'postcss-less',
            plugins: ['postcss-nested'],
          },
        },
        generateScopedName,
      },
    ],
    // [require('./scaffold/babelImportCss'), { moduleNames: ['test-tsdx-v6-no-stroybook'] }],
  ],
};
