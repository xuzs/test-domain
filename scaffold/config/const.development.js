const devServer = require('../server.config');

module.exports = {
  publicPath: `http://${devServer.host}:${devServer.port}/`,
  define: {},
};
