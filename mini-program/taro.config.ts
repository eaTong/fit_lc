import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  appId: process.env.TARO_APP_ID || 'your-appid',
  targets: ['weapp'],
  designWidth: 375,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  framework: 'react'
})