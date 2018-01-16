const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = cwd => {
  const config = require('./config')(cwd)[process.env.FESG_ENV]

  let sharedCssLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        minimize: config.css.extract,
        sourceMap: true,
        url: false
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

  let cssLoader

  if (config.css.extract) {
    cssLoader = {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        use: sharedCssLoaders
      })
    }
  } else {
    cssLoader = {
      test: /\.(css|scss)$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        ...sharedCssLoaders
      ]
    }
  }

  return {
    context: cwd,
    entry: config.entry,
    output: {
      path: config.path,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    devtool: config.devtool,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src'),
            path.resolve(cwd, 'test')
          ],
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(cwd, 'src')
          ],
          loader: 'babel-loader'
        },
        cssLoader
      ]
    }
  }
}
