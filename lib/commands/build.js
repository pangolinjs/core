const fs = require('fs-extra')
const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const store = require('../store')
const webpack = require('webpack')

/**
 * Create production-ready files
 * @param {Object} options Options
 * @param {Boolean} options.dev Build dev
 */
module.exports = function (options) {
  // Set environment variables
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = options.dev ? 'build:dev' : 'build'

  const context = process.cwd()
  store.setup(context)

  if (options.dev) {
    generateImports(context)
  }

  const config = generateConfig(context)

  // Empty output path to get rid of leftovers
  try {
    fs.emptyDirSync(config.output.path)
  } catch (error) {
    throw error
  }

  // Run the webpack pipeline
  webpack(config, (error, stats) => {
    if (error) throw error

    if (stats.hasErrors()) {
      // Exit with a non-zero status code
      // This allows CI tools to report errors
      process.exit(1)
    }

    // Log successful bundling
    console.log(stats.toString({
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      modules: false
    }) + '\n')
  })
}
