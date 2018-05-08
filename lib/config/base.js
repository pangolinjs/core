const Config = require('webpack-chain')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

module.exports = context => {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  config.output
    .filename('js/[name].js')
    .publicPath('/')

  config.module
    .rule('js')
      .test(/\.js$/)
      .include
        .add(path.join(context, 'src'))
        .end()
      .use('babel-loader')
        .loader('babel-loader')
        .end()
      .use('eslint-loader')
        .loader('eslint-loader')
        .options({
          formatter: require('eslint/lib/formatters/codeframe')
        })

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
    .rule('components')
      .test(/\.md$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name (file) {
            const name = path.basename(path.dirname(file))
            return `components/${name}.html`
          }
        })
        .end()
      .use('nunjucks-loader')
        .loader(require.resolve('../html/nunjucks-loader'))
        .options({
          parseMarkdown: true
        })

  config.module
    .rule('prototypes')
    .test(/\.njk$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: '[name].html'
        })
        .end()
      .use('nunjucks-loader')
        .loader(require.resolve('../html/nunjucks-loader'))

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, ['NODE_ENV', 'PANGOLIN_ENV'])

  config
    .plugin('stylelint')
    .use(StylelintPlugin, [{
      formatter: require('stylelint-codeframe-formatter'),
      syntax: 'scss'
    }])

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
