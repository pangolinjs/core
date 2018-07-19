const Config = require('webpack-chain')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const tempPath = require('../utils/temp-path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

/**
 * Create base webpack config
 * @param {string} context Project directory
 * @returns {Object} webpack-chain object
 */
module.exports = context => {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')
    .add(tempPath(context, 'scripts.js'))
    .add(tempPath(context, 'styles.scss'))

  config.output
    .filename('js/[name].js')
    .publicPath('/')

  config.resolve
    .alias
      .set('@', path.join(context, 'src'))

  config.module
    .rule('js')
      .test(/\.js$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel-loader')
        .loader('babel-loader')

  config.module
    .rule('css')
      .test(/\.(css|scss)$/)
      .use('css-loader')
        .loader('css-loader')
        .options({
          importLoaders: 2,
          sourceMap: true,
          url: false
        })
        .end()
      .use('postcss-loader')
        .loader('postcss-loader')
        .options({
          sourceMap: true
        })
        .end()
      .use('sass-loader')
        .loader('sass-loader')
        .options({
          precision: 10,
          sourceMap: true
        })

  config.module
    .rule('html')
      .test(/\.njk$/)
      // .use('file-loader')
      //   .loader('file-loader')
      //   .options({
      //     context: 'src/components',
      //     name: '[path][name].html'
      //   })
      //   .end()
      .use('nunjucks-loader')
        .loader(require.resolve('../loader/nunjucks'))

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV',
      'PANGOLIN_ENV'
    ])

  config
    .plugin('progress')
    .use(WebpackBar, [{
      color: '#ff721f',
      compiledIn: false,
      name: 'Pangolin'
    }])

  config
    .plugin('friendly-errors')
    .use(FriendlyErrorsPlugin)

  /* eslint-enable indent */

  return config
}
