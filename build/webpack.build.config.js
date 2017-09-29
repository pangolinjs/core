const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

module.exports = (cwd) => {
  // ESLint loader
  const eslintLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre'
  }

  // Babel loader
  const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }

  // CSS loader
  const cssLoader = {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: {
              safe: true
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
    })
  }

  // Compress JavaScript plugin
  const compressJSPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  })

  // Extract CSS plugin
  const extractCSSPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
  })

  // Code Splitting plugin
  const codeSplittingPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(cwd, 'node_modules')) === 0
      )
    }
  })

  // Extract webpack manfigest plugin
  const extractWebpackManifestPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })

  // Format output plugin
  const formatOutputPlugin = new FriendlyErrors({
    clearConsole: false
  })

  // Don't emit files with error plugin
  const noErrorEmitPlugin = new webpack.NoEmitOnErrorsPlugin()

  return {
    context: cwd,
    entry: './src/main.js',
    output: {
      path: `${cwd}/dist`,
      filename: 'js/[name].js',
      chunkFilename: 'js/[id].js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        eslintLoader,
        babelLoader,
        cssLoader
      ]
    },
    plugins: [
      compressJSPlugin,
      extractCSSPlugin,
      // compressCSSPlugin,
      codeSplittingPlugin,
      extractWebpackManifestPlugin,
      formatOutputPlugin,
      noErrorEmitPlugin
    ]
  }
}
