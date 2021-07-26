const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devServer = require('../server.config');
const createLoaders = require('./createLoaders');
const config = require('./base');

module.exports = {
  mode: 'development',
  devtool: 'source-map', // eval source-map
  entry: config.entry,
  output: {
    path: config.buildPath,
    publicPath: config.publicPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    // libraryTarget: 'umd',
    // jsonpFunction: '', // 不需要写入 默认会拼接上library上
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': config.srcPath,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.DefinePlugin(config.define),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: config.copyPath,
    //       to: config.copyDir,
    //     },
    //   ],
    // }),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: config.template,
      templateParameters: config.ejsTemplateParameters,
    }),
  ],
  module: {
    rules: createLoaders({ isDev: true }),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          idHint: 'vendors', // 仅限打包日志中 提示
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
      },
    },
  },
  devServer,
  stats: {
    colors: true,
    modules: false,
    chunks: false,
    chunkModules: false,
    children: false,
  },
};
