const chalk = require('chalk')
const fs = require('fs-extra')
const generateConfig = require('../config/generate')
const metadata = require('../html/metadata')
const webpack = require('webpack')

/**
 * Create production-ready files
 * @param {Object} args CLI arguments
 * @param {Boolean} args.dev Build dev
 * @param {Boolean} args.proto Build proto
 */
module.exports = function (args) {
  if (args.dev && args.proto) {
    console.error(chalk`
  Please run only one build at a time:

  {cyan pangolin build} {bold --dev}
  {cyan pangolin build} {bold --proto}
`
    )

    process.exit(1)
  }

  // Set environment variables
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  if (args.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'
  }

  if (args.proto) {
    process.env.PANGOLIN_ENV = 'build:proto'
  }

  const context = process.cwd()
  metadata.startup(context)
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
      // Log unsuccessful bundling
      console.log(stats.toString({
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        modules: false
      }) + '\n')

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
