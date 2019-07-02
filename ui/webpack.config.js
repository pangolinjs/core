const Config = require('webpack-chain')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

const config = new Config()

/* eslint-disable indent */

config
  .context(path.resolve(__dirname))
  .devtool('source-map')

config.entry('main')
  .add('./src/main.js')
  .add('./src/main.scss')

config.output
  .filename('scripts.js')
  .path(path.resolve(__dirname, 'dist/pangolin'))

config.module
  .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
      .loader('vue-loader')

config.module
  .rule('css')
    .test(/\.(css|scss|sass)$/)
    .use('css-extract-loader')
      .loader(CSSExtractPlugin.loader)
      .end()
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
        plugins: [
          require('postcss-custom-properties')(),
          require('cssnano')()
        ],
        sourceMap: true
      })
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .options({
        implementation: require('sass'),
        precision: 10,
        sourceMap: true
      })

config
  .plugin('vue')
  .use(VueLoaderPlugin)

config
  .plugin('vuetify')
  .use(VuetifyLoaderPlugin)

config
  .plugin('css-extract')
  .use(CSSExtractPlugin, [{
    filename: 'styles.css'
  }])

config
  .plugin('progress')
  .use(webpack.ProgressPlugin)

/* eslint-enable indent */

module.exports = config.toConfig()
