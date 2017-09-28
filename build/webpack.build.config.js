const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')

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
            sourceMap: process.env.NODE_ENV === 'development'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'development'
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
    sourceMap: process.env.NODE_ENV === 'development'
  })

  // Extract CSS plugin
  const extractCSSPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
  })

  // Compress CSS plugin
  const compressCSSPlugin = new OptimizeCSSAssets({
    cssProcessorOptions: {
      safe: true,
      map: process.env.NODE_ENV === 'development'
        ? { inline: false }
        : false
    }
  })

  // Code Splitting plugin
  const codeSplittingPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    // filename: 'vendor.js',
    minChunks: function (module, count) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(`${cwd}/node_modules`) === 0
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
      compressCSSPlugin,
      codeSplittingPlugin,
      extractWebpackManifestPlugin,
      formatOutputPlugin,
      noErrorEmitPlugin
    ]
  }
}
