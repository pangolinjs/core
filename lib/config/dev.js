const merge = require('webpack-merge')

module.exports = context => {
  return merge(require('./base')(context), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map'
  })
}
