const generateConfig = require('../config/generate')
const store = require('../store')
const util = require('util')

/**
 * Generate and output webpack config
 * @param {Object} options Options
 * @param {Boolean} options.dev Enable dev config output
 * @param {Boolean} options.build Enable build config output
 * @param {Boolean} options.verbose Enable verbose output
 */
module.exports = function (options) {
  if (options.task === 'dev') {
    process.env.NODE_ENV = 'development'
    process.env.PANGOLIN_ENV = 'dev'
  }

  if (options.task === 'build') {
    process.env.NODE_ENV = 'production'
    process.env.PANGOLIN_ENV = 'build'
  }

  if (options.task === 'build' && options.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'
  }

  const context = process.cwd()
  store.setup(context)

  const config = generateConfig(context)
  const output = util.inspect(config, {
    colors: true,
    compact: false,
    depth: null
  })

  console.log(output)
}
