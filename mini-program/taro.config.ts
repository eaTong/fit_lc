import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  appId: 'your-appid',
  date: '2026-04-29',
  targets: ['weapp'],
  designWidth: 375,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  framework: 'react',
  compilationDate: new Date().toISOString()
})