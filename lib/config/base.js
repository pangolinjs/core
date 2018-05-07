const CSSExtractPlugin = require('mini-css-extract-plugin')
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

  return {
    context: context,
    entry: ['./src/main.js', './src/main.scss'],
    output: {
      path: outputPaths[process.env.PANGOLIN_ENV],
      filename: 'js/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(context, 'src')
          ],
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            emitWarning: process.env.PANGOLIN_ENV === 'dev'
          }
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(context, 'src')
          ],
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: [
            process.env.PANGOLIN_ENV.startsWith('build')
              ? CSSExtractPlugin.loader
              : {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: process.env.PANGOLIN_ENV.startsWith('build')
                  ? { mergeRules: false }
                  : false,
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                precision: 10,
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name (file) {
                  const name = path.basename(path.dirname(file))
                  return `components/${name}.html`
                }
              }
            },
            {
              loader: require.resolve('../html/nunjucks-loader'),
              options: {
                parseMarkdown: true
              }
            }
          ]
        },
        {
          test: /\.njk$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].html'
              }
            },
            {
              loader: require.resolve('../html/nunjucks-loader')
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`,
          PANGOLIN_ENV: `"${process.env.PANGOLIN_ENV}"`
        }
      }),
      new StylelintPlugin({
        emitErrors: process.env.PANGOLIN_ENV.startsWith('build'),
        syntax: 'scss'
      }),
      new CSSExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  }
}
