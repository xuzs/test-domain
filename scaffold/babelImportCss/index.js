const { addSideEffect } = require('@babel/helper-module-imports');

/**
 * 使用方式如下
 * 在.babelrc.js文件加入
 *
 *  plugins: [
 *    ...,
 *    [require('./scaffold/babelImportCss'), { moduleNames: ['@meijian/ui'] }],
 *  ],
 *
 */

/**
 * 不需要担心的问题
 * 1. import type 纯类型时，不会导入额外的样式 比如 import type { Interface } from 'moduleName'. 不会引入额外的样式
 * 2. dynamic import 时, 样式动态加载
 * @param api
 * @param options type options = { moduleNames: string[] }
 * @return {{visitor: {ImportDeclaration(*=, *=): void}}}
 */
const plugins = (api, options) => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const file = (path && path.hub && path.hub.file) || (state && state.file);

        const moduleName = path.node.source.value;
        if (options.moduleNames && Array.isArray(options.moduleNames) && options.moduleNames.includes(moduleName)) {
          // 解析内置的调用
          const nameSet = new Set();
          path.node.specifiers.forEach((specifier) => {
            const name = specifier.imported.name ?? '';
            if (name) {
              nameSet.add(name);
              // 处理modal内置依赖button问题
              if (name === 'Modal') {
                nameSet.add('Button');
              }
            }
          });
          nameSet.forEach((name) => {
            addSideEffect(file.path, `${moduleName}/dist/style/${name.toLocaleLowerCase()}`);
          });
        }
      },
    },
  };
};

module.exports = plugins;
