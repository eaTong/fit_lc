module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 3 versions', 'iOS >= 8', 'Android >= 4']
      }
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    '@babel/preset-typescript'
  ]
}