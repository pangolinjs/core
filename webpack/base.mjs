import Config from 'webpack-chain'
import sass from 'sass'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'

import getConfig from '../lib/get-config.mjs'
import generateFileLoaderOptions from '../lib/generate-file-loader-options.mjs'

/**
 * Base webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  const projectConfig = await getConfig({ context })
  const webpackConfig = new Config()

  /* eslint-disable indent */

  webpackConfig.context(context)

  webpackConfig.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  // JS

  webpackConfig.module.rule('js')
    .test(/\.m?js$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .end()

  // CSS

  webpackConfig.module.rule('css')
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

  webpackConfig.module
    .rule('img')
      .test(/\.(png|jpe?g|webp|svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({
          type: 'img',
          hash: projectConfig.hashFiles
        }))

  webpackConfig.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({
          type: 'video',
          hash: projectConfig.hashFiles
        }))

  webpackConfig.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({
          type: 'audio',
          hash: projectConfig.hashFiles
        }))

  webpackConfig.module
    .rule('font')
      .test(/\.(woff2?)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options(generateFileLoaderOptions({
          type: 'font',
          hash: projectConfig.hashFiles
        }))

  // Plugins

  webpackConfig.plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV'
    ])

  webpackConfig.plugin('progress')
    .use(WebpackBar, [{
      color: '#ff721f',
      profile: true
    }])

  /* eslint-enable indent */

  return webpackConfig
}
