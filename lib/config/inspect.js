const generateConfig = require('./generate')

/**
 * Create webpack config object
 * @param {string} context Project directory
 * @param {'dev'|'build'} task Task to inspect
 * @param {Object} options Additional arguments
 */
module.exports = function (context, task, options) {
  if (task === 'dev') {
    process.env.NODE_ENV = 'development'
    process.env.PANGOLIN_ENV = 'dev'
  }

  if (task === 'build') {
    process.env.NODE_ENV = 'production'
    process.env.PANGOLIN_ENV = 'build'
  }

  if (options.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'
  }

  if (options.proto) {
    process.env.PANGOLIN_ENV = 'build:proto'
  }

  return generateConfig(context)
}
