process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'build:dev'

const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

const htmlUtils = require('./html/utils')
const renderNunjucks = require('./html/render-nunjucks')

module.exports = cwd => {
  const config = require('./config')(cwd)[process.env.FESG_ENV]
  const webpackConfig = require('./webpack.build.config')(cwd)

  // Empty output path to get rid of leftovers
  fs.emptyDir(config.path, error => {
    if (error) throw error

    // Run the webpack pipeline
    webpack(webpackConfig, (error, stats) => {
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
    glob('*/docs.njk', { cwd: `${cwd}/src/components` }, (error, files) => {
      if (error) throw error

      files.forEach(file => {
        let name = path.dirname(file)

        let inputPath = `components/${name}/docs.njk`
        let outputPath = `${config.path}/components/${name}.html`

        renderNunjucks(cwd, inputPath)
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
    glob('*.njk', { cwd: `${cwd}/src/prototypes` }, (error, files) => {
      if (error) throw error

      files.forEach(file => {
        let name = path.basename(file, '.njk')

        let inputPath = `prototypes/${name}.njk`
        let outputPath = `${config.path}/${name}.html`

        renderNunjucks(cwd, inputPath)
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
  })
}
