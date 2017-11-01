const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname),
  entry: './js/index.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'js')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')()],
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
        })
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    })
  ]
}
