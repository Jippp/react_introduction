const CracoLessPlugin = require('craco-less');
const { loaderByName } = require('@craco/craco');
const path = require('path');

const lessModuleRegex = /\.module\.less$/;

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 自定义变量
            // modifyVars: {
            //     @primary-color: '#2378ff'
            // },
            javascriptEnabled: true
          }
        },
        // lessmodule配置
        modifyLessModuleRule(lessModuleRule) {
          lessModuleRule.test = lessModuleRegex;

          lessModuleRule.use.find(loaderByName('css-loader')).options.modules =
            {
              // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            };

          return lessModuleRule;
        }
      }
    }
  ]
};
