const CSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  entry: ['./js/index.js', './css/index.scss'],
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, '.temp')
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
        use: [
          CSSExtractPlugin.loader,
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
      }
    ]
  },
  plugins: [
    new CSSExtractPlugin({
      filename: 'styles.css'
    })
  ]
}
