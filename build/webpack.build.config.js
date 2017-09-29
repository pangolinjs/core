const path = require('path')
const webpack = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = (cwd) => {
  // Lint JavaScript
  const eslintLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre'
  }

  // Transpile with Babel
  const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }

  // Compile Sass
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

  // Minify JavaScript and eliminate dead code (tree shaking)
  const compressJSPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  })

  // Extract CSS from bundled JavaScript
  const extractCSSPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
  })

  // Separate vendor JavaScript from bundle
  const extractVendorPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(cwd, 'node_modules')) === 0
      )
    }
  })

  // Separate webpack manifest JavaScript from bundle
  const extractManifestPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })

  // Copy static assets folder
  const copyAssetsPlugin = new CopyPlugin([
    {
      from: `src/assets`,
      to: 'assets'
    }
  ])

  // Compress images from static assets
  const compressImages = new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    jpegtran: {
      progressive: true
    }
  })

  // Format output
  const formatOutputPlugin = new FriendlyErrors({
    clearConsole: false
  })

  // Don't emit files with error
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
      extractVendorPlugin,
      extractManifestPlugin,
      copyAssetsPlugin,
      compressImages,
      formatOutputPlugin,
      noErrorEmitPlugin
    ]
  }
}
