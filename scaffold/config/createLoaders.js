const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateScopedName = require('../generateScopedName');

const createLoaders = ({ isDev = false }) => {
  const lessOptions = {
    javascriptEnabled: true,
    strictMath: false,
    noIeCompat: true,
    globalVars: {},
    modifyVars: {},
  };
  return [
    {
      test: /\.css$/,
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
        },
      ],
    },
    {
      test: /\.module\.less$/,
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            url: true,
            sourceMap: isDev,
            modules: {
              getLocalIdent({ resourcePath }, localIdentName, localName) {
                return generateScopedName(localName, resourcePath);
              },
            },
            importLoaders: 2,
          },
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions,
          },
        },
      ],
    },
    {
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            url: true,
            sourceMap: isDev,
            importLoaders: 2,
          },
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions,
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[contenthash].[ext]',
          esModule: false,
        },
      },
    },
    {
      test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
      use: 'file-loader',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            compact: false,
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            compact: false,
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        {
          loader: 'ts-loader',
          options: isDev
            ? {
                configFile: 'tsconfig.dev.json',
              }
            : {},
        },
      ],
    },
  ];
};

module.exports = createLoaders;
