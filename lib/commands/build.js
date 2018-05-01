const fs = require('fs-extra')
const glob = require('fast-glob')
const htmlUtils = require('../html/utils')
const merge = require('webpack-merge')
const path = require('path')
const renderNunjucks = require('../html/render-nunjucks')
const webpack = require('webpack')

module.exports = function (args) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  if (args.dev) {
    process.env.PANGOLIN_ENV = 'build:dev'
  }

  if (args.proto) {
    process.env.PANGOLIN_ENV = 'build:proto'
  }

  const context = process.cwd()
  const config = merge(
    require('../config/build')(context),
    require('../config/project')(context)
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
      console.log(stats.toString({
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        errors: false,
        modules: false
      }) + '\n')
      process.exit(1)
    }

    console.log(stats.toString({
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      errors: false,
      modules: false
    }) + '\n')
  })

  // Generate component HTML for dev build
  if (args.dev) {
    const files = glob.sync('*/docs.njk', { cwd: path.join(context, 'src/components') })

    files.forEach(file => {
      let name = path.dirname(file)

      let inputPath = path.join('components', name, 'docs.njk')
      let outputPath = path.join(config.output.path, 'components', name + '.html')

      renderNunjucks(context, inputPath)
        .then(html => {
          fs.outputFile(outputPath, html, error => {
            if (error) throw error
          })
        })
        .catch(error => {
          htmlUtils.log.error(error, inputPath)
          process.exit(1)
        })
    })
  }

  // Generate prototype HTML for dev and proto build
  if (args.dev || args.proto) {
    const files = glob.sync('*.njk', { cwd: path.join(context, 'src/prototypes') })

    files.forEach(file => {
      let name = path.basename(file, '.njk')

      let inputPath = path.join('prototypes', name + '.njk')
      let outputPath = path.join(config.output.path, name + '.html')

      renderNunjucks(context, inputPath)
        .then(html => {
          fs.outputFile(outputPath, html, error => {
            if (error) throw error
          })
        })
        .catch(error => {
          htmlUtils.log.error(error, inputPath)
          process.exit(1)
        })
    })
  }
}
