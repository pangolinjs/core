process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const renderHTML = require('./render-html')
const webpack = require('webpack')

module.exports = (cwd) => {
  const config = require('./webpack.build.config')(cwd)

  // Output path
  config.output.path = `${cwd}/dev`

  // Source map level
  config.devtool = 'source-map'

  // NODE_ENV plugin
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }))

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

    const globOptions = {
      cwd
    }

    // Render prototypes and write HTML files
    glob(`src/prototypes/*.njk`, globOptions, (error, files) => {
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
