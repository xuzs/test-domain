const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const createLoaders = require('./createLoaders');
const config = require('./base');

module.exports = {
  mode: 'production',
  entry: config.entry,
  output: {
    path: config.buildPath,
    publicPath: config.publicPath,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
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
    process.env.NEED_ANALYZE ? new BundleAnalyzerPlugin() : null,
    new webpack.DefinePlugin(config.define),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: config.copyPath,
    //       to: config.copyDir,
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[chunkhash].chunk.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: config.template,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      templateParameters: config.ejsTemplateParameters,
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
  ].filter(Boolean),
  module: {
    rules: createLoaders({ isDev: false }),
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false, // 是否生成LICENSE.txt
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
};
