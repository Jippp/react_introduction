import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // 提供打包时DCE、代码压缩等的支持
        plugins: ["babel-plugin-styled-components"]
      }
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false
        },
        {
          libName: 'antd',
          style(name) {
            // use less
            return `antd/es/${name}/style/index.js`
          }
        },
      ]
    })
  ],
  css: {
    // css module配置
    modules: {
      generateScopedName: '[path][name]__[local]__[hash:base64:5]'
    },
    // postcss配置
    postcss: {
      plugins: [
        postcssPresetEnv()
      ]
    }
  },
})
