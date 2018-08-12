const Config = require('webpack-chain')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
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
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  config.output
    .filename('js/[name].js')
    .publicPath(store.config.project.base)

  config.resolve
    .alias
      .set('@', path.join(context, 'src'))

  config.resolveLoader
    .modules
      .add('node_modules')
      .add(path.join(context, 'node_modules'))
      .add(path.join(context, 'node_modules/@pangolin/core/node_modules'))

  // JavaScript

  config.module
    .rule('js')
      .test(/\.js$/)
      .exclude
        .add(/node_modules/)
        .end()
      .use('babel-loader')
        .loader('babel-loader')

  // CSS

  config.module
    .rule('css')
      .test(/\.(css|scss)$/)
      .use('css-loader')
        .loader('css-loader')
        .options({
          importLoaders: 2,
          sourceMap: true
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

  // HTML

  config.module
    .rule('html')
      .test(/\.njk$/)
      .use('nunjucks-loader')
        .loader(require.resolve('../nunjucks/loader'))

  // Static assets

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/img/[name].[ext]',
          publicPath: process.env.NODE_ENV === 'production' && '..'
        })

  config.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/video/[name].[ext]',
          publicPath: process.env.NODE_ENV === 'production' && '..'
        })

  config.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/audio/[name].[ext]',
          publicPath: process.env.NODE_ENV === 'production' && '..'
        })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/fonts/[name].[ext]',
          publicPath: process.env.NODE_ENV === 'production' && '..'
        })

  // Plugins

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
