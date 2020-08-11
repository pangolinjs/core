import Config from 'webpack-chain'
import sass from 'sass'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'

import generateFileLoaderOptions from '../lib/generate-file-loader-options.mjs'

/**
 * Base webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  // JS

  config.module.rule('js')
    .test(/\.m?js$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .end()

  // CSS

  config.module.rule('css')
    .test(/\.s?css$/)
    .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 2
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
        implementation: sass
      })
      .end()

  // Static assets

  config.module
    .rule('img')
      .test(/\.(png|jpe?g|webp|svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({ type: 'img' }))

  config.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({ type: 'video' }))

  config.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({ type: 'audio' }))

  config.module
    .rule('font')
      .test(/\.(woff2?)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({ type: 'font' }))

  // Plugins

  config.plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV'
    ])

  config.plugin('progress')
    .use(WebpackBar, [{
      color: '#ff721f',
      profile: true
    }])

  /* eslint-enable indent */

  return config
}
