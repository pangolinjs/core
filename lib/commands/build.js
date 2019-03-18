const fs = require('fs-extra')
const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const store = require('../store')
const webpack = require('webpack')

function runWebpack (config) {
  webpack(config, (_, stats) => {
    if (stats.hasErrors()) {
      // Exit with a non-zero status code
      // This allows CI tools to report errors
      process.exit(1)
    }
  })
}

/**
 * Create production-ready files
 * @param {Object} options Options
 * @param {Boolean} options.dev Build dev
 * @param {Boolean} options.modern Build additional modern bundle
 * @param {Boolean} options.report Generate report
 */
module.exports = function (options) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = options.dev ? 'build:dev' : 'build'
  process.env.PANGOLIN_BUILD = 'legacy'

  const context = process.cwd()
  store.setup(context)
  store.state.modern = options.modern

  if (options.dev) {
    generateImports(context)
  }

  const webpackConfig = generateConfig(context, {
    report: options.report
  })

  // Empty output path to get rid of leftovers
  try {
    fs.emptyDirSync(webpackConfig.output.path)
  } catch (error) {
    throw error
  }

  runWebpack(webpackConfig)

  // Run webpack for optional modern bundle
  if (options.modern) {
    process.env.PANGOLIN_BUILD = 'modern'
    process.env.BROWSERSLIST_ENV = 'modern'

    const webpackConfigModern = generateConfig(context, {
      report: options.report,
      modern: true
    })

    runWebpack(webpackConfigModern)
  }
}
