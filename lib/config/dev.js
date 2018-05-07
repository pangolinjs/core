module.exports = context => {
  const config = require('./base')(context)

  /* eslint-disable indent */

  config
    .mode('development')
    .devtool('cheap-module-eval-source-map')

  config.module
    .rule('css')
      .use('style-loader')
        .loader('style-loader')
        .before('css-loader')
        .options({
          sourceMap: true
        })

  /* eslint-enable indent */

  return config
}
