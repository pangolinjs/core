process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'build:dev'

const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const renderHTML = require('./render-html')
const webpack = require('webpack')

module.exports = (cwd) => {
  const config = require('./webpack.build.config')(cwd)

  // Output path
  config.output.path = `${cwd}/dev`

  // Set NODE_ENV
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }))

  // Empty output path to get rid of leftovers
  fs.emptyDir(`${cwd}/dev`, error => {
    if (error) throw error

    webpack(config, (error, stats) => {
      if (error) throw error

      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        process.exit(1)
      }
    })

    // Render prototypes and write HTML files
    glob(`src/prototypes/*.njk`, { cwd }, (error, files) => {
      if (error) throw error

      files.forEach(file => {
        let fileName = path.basename(file, '.njk')

        renderHTML.prototypes(cwd, `${fileName}.njk`)
          .then(html => {
            fs.writeFile(`${cwd}/dev/${fileName}.html`, html, (error) => {
              if (error) throw error
            })
          })
          .catch(error => {
            console.error(error)
          })
      })
    })
  })
}
