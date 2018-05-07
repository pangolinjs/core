const CopyPlugin = require('copy-webpack-plugin')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const path = require('path')

module.exports = context => {
  const config = require('./base')(context)

  /* eslint-disable indent */

  config
    .mode('production')
    .devtool('source-map')

  config.optimization
    .splitChunks({
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    })

  config.module
    .rule('css')
      .use('css-extract-loader')
        .loader(CSSExtractPlugin.loader)
        .before('css-loader')

  config
    .plugin('extract-css')
    .use(CSSExtractPlugin, [{
      filename: 'css/[name].css'
    }])

  config
    .plugin('copy')
    .use(CopyPlugin, [[
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        context: path.join(__dirname, '../../docs/.temp'),
        from: '*(scripts.*|styles.*)',
        to: 'pangolin',
        ignore: [process.env.PANGOLIN_ENV === 'build:dev' ? '' : '*']
      }
    ]])

  config
    .plugin('imagemin')
    .use(ImageminPlugin, [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: {
        progressive: true
      }
    }])

  /* eslint-enable indent */

  return config
}
