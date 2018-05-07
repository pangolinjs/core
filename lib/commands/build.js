const fs = require('fs-extra')
const generateImports = require('../html/generate-imports')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = function (args) {
  // Set environment variables
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  // Save project directory
  const context = process.cwd()

  // Holder for additional entry points for components and pages
  const pageEntries = []

  // Settings specific to dev build
  if (args.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'

    // Add components entry point
    pageEntries.push(generateImports.components(context))
  }

  // Settings specific to prototype build
  if (args.proto) {
    process.env.PANGOLIN_ENV = 'build:proto'
  }

  // Settings specific to dev and prototype build
  if (args.dev || args.proto) {
    // Add prototypes entry point
    pageEntries.push(generateImports.prototypes(context))
  }

  // Merge webpack configs together
  const config = merge(
    require('../config/build')(context),
    require('../config/project')(context),
    { entry: pageEntries }
  )

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
        errors: false,
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
      errors: false,
      modules: false
    }) + '\n')
  })
}
