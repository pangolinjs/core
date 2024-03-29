import Config from 'webpack-chain'
import sass from 'sass'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'

import getConfig from '../lib/get-config.js'
import generateAssetFilename from '../lib/generate-asset-filename.js'

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

  webpackConfig.output
    .publicPath(projectConfig.project.base)

  webpackConfig.resolve
    .extensions
      .add('.js')
      .add('.mjs')
      .add('.json')
      .end()

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
        importLoaders: 3
      })
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .end()
    .use('resolve-url-loader')
      .loader('resolve-url-loader')
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
      .test(/\.(png|jpe?g|webp|avif|svg)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename({ type: 'img', hash: projectConfig.hashFiles })
      })

  webpackConfig.module
    .rule('video')
      .test(/\.(mp4|webm)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename({ type: 'video', hash: projectConfig.hashFiles })
      })

  webpackConfig.module
    .rule('audio')
      .test(/\.(ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename({ type: 'audio', hash: projectConfig.hashFiles })
      })

  webpackConfig.module
    .rule('font')
      .test(/\.(woff2?)(\?.*)?$/)
      .type('asset/resource')
      .set('generator', {
        filename: generateAssetFilename({ type: 'font', hash: projectConfig.hashFiles })
      })

  // Plugins

  webpackConfig.plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV'
    ])

  webpackConfig.plugin('progress')
    .use(WebpackBar, [{
      name: 'Pangolin.js',
      color: '#ff721f',
      profile: true
    }])

  /* eslint-enable indent */

  return webpackConfig
}
