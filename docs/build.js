const Config = require('webpack-chain')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')

const config = new Config()

/* eslint-disable indent */

config
  .mode('production')
  .context(path.resolve(__dirname))
  .devtool('source-map')

config.entry('index')
  .add('./js/index.js')
  .add('./css/index.scss')

config.output
  .filename('scripts.js')
  .path(path.resolve(__dirname, '.temp'))

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
    .use('css-extract-loader')
      .loader(CSSExtractPlugin.loader)
      .end()
    .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 2,
        minimize: true,
        sourceMap: true
      })
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        plugins: [require('autoprefixer')()],
        sourceMap: true
      })
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .options({
        precision: 10,
        sourceMap: true
      })

config
  .plugin('css-extract')
  .use(CSSExtractPlugin, [{
    filename: 'styles.css'
  }])

config
  .plugin('progress')
  .use(webpack.ProgressPlugin)

/* eslint-disable enable */

webpack(config.toConfig(), (error, stats) => {
  if (error) throw error

  if (stats.hasErrors()) {
    // Log unsuccessful bundling
    console.log(stats.toString('errors-only') + '\n')

    // Exit with a non-zero status code
    // This allows CI tools to report errors
    process.exit(1)
  }
})
