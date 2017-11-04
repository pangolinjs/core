module.exports = cwd => {
  return {
    'dev': {
      entry: ['./src/main.js', `${__dirname}/dev-client`],
      path: `${cwd}/dev`,
      devtool: 'cheap-module-eval-source-map',
      css: {
        extract: false
      }
    },
    'build': {
      entry: './src/main.js',
      path: `${cwd}/dist`,
      devtool: 'source-map',
      css: {
        extract: true
      }
    },
    'build:dev': {
      entry: './src/main.js',
      path: `${cwd}/dev`,
      devtool: 'source-map',
      css: {
        extract: true
      }
    },
    'build:proto': {
      entry: './src/main.js',
      path: `${cwd}/proto`,
      devtool: 'source-map',
      css: {
        extract: true
      }
    }
  }
}
