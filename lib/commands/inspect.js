const generateConfig = require('../config/generate')
const store = require('../store')
const util = require('util')

/**
 * Generate and output webpack config
 * @param {Object} options Options
 * @param {Boolean} options.dev Enable dev config output
 * @param {Boolean} options.compact Enable compact config output
 */
module.exports = function (options) {
  if (options.task === 'dev') {
    process.env.NODE_ENV = 'development'
    process.env.PANGOLIN_ENV = 'dev'
  }

  if (options.task === 'build') {
    process.env.NODE_ENV = 'production'
    process.env.PANGOLIN_ENV = options.dev ? 'build:dev' : 'build'
  }

  const context = process.cwd()
  store.setup(context)

  const webpackConfig = generateConfig(context)
  const output = util.inspect(webpackConfig, {
    colors: true,
    compact: options.compact,
    depth: null
  })

  console.log(output)
}
