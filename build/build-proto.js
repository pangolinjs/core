process.env.NODE_ENV = 'production'
process.env.FESG_ENV = 'build:proto'

const fs = require('fs-extra')
const glob = require('glob')
const htmlUtils = require('./html/utils')
const path = require('path')
const renderNunjucks = require('./html/render-nunjucks')
const webpack = require('webpack')

module.exports = cwd => {
  const config = require('./webpack.build.config')(cwd)

  // Empty output path to get rid of leftovers
  fs.emptyDir(config.output.path, error => {
    if (error) throw error

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

    // Render prototypes and write HTML files
    glob('*.njk', { cwd: path.join(cwd, 'src/prototypes') }, (error, files) => {
      if (error) throw error

      files.forEach(file => {
        let name = path.basename(file, '.njk')

        let inputPath = path.join('prototypes', name + '.njk')
        let outputPath = path.join(config.output.path, name + '.html')

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
