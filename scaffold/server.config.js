module.exports = {
  port: 8888,
  hot: true,
  host: '0.0.0.0',
  liveReload: false,
  proxy: {
    '/api': {
      target: 'http://***',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  open: true,
  historyApiFallback: true,
  // webpack-dev-server@3配置
  // inline: true,
  // disableHostCheck: true,
  // stats: {
  //   colors: true,
  //   modules: false,
  //   chunks: false,
  //   chunkModules: false,
  //   children: false,
  // },

  //  webpack-dev-server@4.0配置
  firewall: false,
  // clientOverlay 为正式版本api且默认开启
};
