const Config = require('webpack-chain')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

module.exports = context => {
  const outputPaths = {
    'dev': path.join(context, 'dev'),
    'build': path.join(context, 'dist'),
    'build:dev': path.join(context, 'dev'),
    'build:proto': path.join(context, 'proto')
  }

  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  config.output
    .path(outputPaths[process.env.PANGOLIN_ENV])
    .filename('js/[name].js')
    .publicPath('/')

  config.module
    .rule('js')
      .test(/\.js$/)
      .include
        .add('src')
        .end()
      .use('eslint-loader')
        .loader('eslint-loader')
        .options({
          emitWarning: process.env.PANGOLIN_ENV === 'dev'
        })
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
          minimize: process.env.PANGOLIN_ENV.startsWith('build')
            ? { mergeRules: false }
            : false,
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
    .plugin('progress')
    .use(webpack.ProgressPlugin)

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, ['NODE_ENV', 'PANGOLIN_ENV'])

  config
    .plugin('stylelint')
    .use(StylelintPlugin, [{
      emitErrors: process.env.PANGOLIN_ENV.startsWith('build'),
      syntax: 'scss'
    }])

  config
    .plugin('output-formatter')
    .use(FriendlyErrorsPlugin)

  /* eslint-enable indent */

  return config
}
