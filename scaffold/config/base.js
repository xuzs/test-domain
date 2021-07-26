const path = require('path');
const fs = require('fs');

const __DEV__ = (process.env.NODE_ENV || 'development') === 'development';

const config = __DEV__ ? require('./const.development') : require('./const.production');

const rootPath = 'src';
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (...relativePaths) => path.resolve(appDirectory, ...relativePaths);

const getDefineConfig = (config) =>
  Object.entries(config).reduce((result, [k, v]) => {
    result[k] = JSON.stringify(v);
    return result;
  }, {});

module.exports = {
  entry: {
    app: resolveApp(rootPath, 'index.tsx'),
  },
  buildDir: 'build',
  buildPath: resolveApp('build'),
  copyDir: 'worker',
  copyPath: resolveApp(rootPath, 'worker'),
  srcPath: resolveApp(rootPath),
  template: resolveApp(rootPath, 'index.ejs'),
  ejsTemplateParameters: {
    // //EJS 定义常量
    title: 'Document',
  },
  publicPath: config.publicPath,
  define: getDefineConfig({ __DEV__, ...config.define }),
};
