const path = require('path')
const webpack = require('webpack')

const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (cwd) => {
  return {
    context: cwd,
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    output: {
      path: `${cwd}/dev`,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        'fesg': path.join(__dirname, '../docs')
      }
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src'),
            path.resolve(__dirname, '../docs')
          ],
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src'),
            path.resolve(__dirname, '../docs')
          ],
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          include: [
            path.resolve(cwd, 'src'),
            path.resolve(cwd, 'config'),
            path.resolve(__dirname, '../docs')
          ],
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(cwd, 'postcss.config.js')
                },
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
        }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${process.env.NODE_ENV}"`,
          FESG_ENV: `"${process.env.FESG_ENV}"`
        }
      }),
      new StylelintPlugin({
        syntax: 'scss'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
