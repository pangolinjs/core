const Config = require('webpack-chain')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const getConfig = require('../utils/get-config')
const ComponentsIndexPlugin = require('../nunjucks/components-index-plugin')
const path = require('path')
const store = require('../store')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

/**
 * Create base webpack config
 * @param {string} context Project directory
 * @returns {Object} webpack-chain object
 */
module.exports = context => {
  if (!store.config) {
    store.config = getConfig(context)

    // Add fallback base path
    if (!store.config.project) {
      store.config.project = { base: '/' }
    } else if (!store.config.project.base) {
      store.config.project.base = '/'
    }
  }

  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')
    .add('./.temp/scripts.js')
    .add('./.temp/styles.scss')

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
      .use('nunjucks-loader')
        .loader(require.resolve('../nunjucks/loader'))

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV',
      'PANGOLIN_ENV'
    ])

  config
    .plugin('components-index')
    .use(ComponentsIndexPlugin)

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
