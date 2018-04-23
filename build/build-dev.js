process.env.NODE_ENV = 'production'
process.env.FESG_ENV = 'build:dev'

const fs = require('fs-extra')
const glob = require('glob')
const htmlUtils = require('./html/utils')
const merge = require('webpack-merge')
const path = require('path')
const renderNunjucks = require('./html/render-nunjucks')
const webpack = require('webpack')

module.exports = context => {
  const config = merge(
    require('./webpack.build.config')(context),
    require('./webpack.project.config')(context)
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

  // Render components and write HTML files
  glob('*/docs.njk', { cwd: path.join(context, 'src/components') }, (error, files) => {
    if (error) throw error

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
  })

  // Render prototypes and write HTML files
  glob('*.njk', { cwd: path.join(context, 'src/prototypes') }, (error, files) => {
    if (error) throw error

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
  })
}
