const chalk = require('chalk')
const fs = require('fs-extra')
const generateImports = require('../html/generate-imports')
const webpack = require('webpack')

module.exports = function (args) {
  // Set environment variables
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  if (args.dev && args.proto) {
    console.error(chalk`
  Please run only one build at a time:

    {blueBright pangolin build} {bold --dev}

  or

    {blueBright pangolin build} {bold --proto}
    `)
    process.exit(1)
  }

  if (args.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'
  }

  if (args.proto) {
    process.env.PANGOLIN_ENV = 'build:proto'
  }

  const context = process.cwd()
  const config = require('../config/build')(context)

  if (args.dev) {
    // Create additional entry points for components and prototypes
    config.entry('main')
      .add(generateImports.components(context))
      .add(generateImports.prototypes(context))
  }

  if (args.proto) {
    // Create additional entry points for prototypes
    config.entry('main')
      .add(generateImports.prototypes(context))
  }

  // Set output-formatter options
  config
    .plugin('output-formatter')
    .tap(args => [...args, {
      clearConsole: false
    }])

  // Convert webpack-chain into readable config
  // TODO: Re-enable project-level config
  const webpackConfig = config.toConfig()

  // Empty output path to get rid of leftovers
  try {
    fs.emptyDirSync(webpackConfig.output.path)
  } catch (error) {
    throw error
  }

  // Run the webpack pipeline
  webpack(webpackConfig, (error, stats) => {
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
