const Config = require('webpack-chain')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

const config = new Config()

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const IS_MODERN = process.env.WEBPACK_BUILD === 'modern'

/* eslint-disable indent */

config
  .context(path.resolve(__dirname))
  .devtool(IS_PRODUCTION ? false : 'eval-cheap-module-source-map')
  .mode(IS_PRODUCTION ? 'production' : 'development')

config.entry('main')
  .add('./src/main.js')

config.output
  .filename(IS_MODERN ? 'scripts.modern.js' : 'scripts.js')
  .path(path.resolve(__dirname, 'dist/pangolin'))

config.module
  .rule('js')
    .test(/\.js$/)
    .include
      .add(path.resolve('src'))
      .add(/node_modules\/deepdash-es/)
      .add(/node_modules\/ky/)
      .add(/node_modules\/vuetify/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3,
            bugfixes: true,
            targets: IS_MODERN
              ? { esmodules: true }
              : ['last 2 versions and > 0.2%', 'not dead']
          }]
        ]
      })

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
      .options({
        esModule: true
      })
      .end()
    .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 2,
        esModule: true,
        sourceMap: true
      })
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        plugins: [
          require('cssnano')()
        ],
        sourceMap: true
      })
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .options({
        implementation: require('sass')
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
