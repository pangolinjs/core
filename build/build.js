process.env.NODE_ENV = 'production'
process.env.PANGOLIN_ENV = 'build'

const fs = require('fs-extra')
const merge = require('webpack-merge')
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
}
