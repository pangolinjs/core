/**
 * Merge project config and convert to webpack readable config object
 *
 * Set `process.env.NODE_ENV` and `process.env.PANGOLIN_ENV`
 * so environment based configuration will work correctly
 *
 * @param {string} context Project directory
 * @returns {Object} webpack config object
 */
module.exports = function (context) {
  let config

  if (process.env.PANGOLIN_ENV === 'dev') {
    config = require('./dev')(context)
  }

  if (process.env.PANGOLIN_ENV.startsWith('build')) {
    config = require('./build')(context)
  }

  let webpackConfig = config.toConfig()

  return webpackConfig
}
