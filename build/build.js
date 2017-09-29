process.env.NODE_ENV = 'production'
process.env.FESG_ENV = 'build'

const fs = require('fs-extra')
const webpack = require('webpack')

module.exports = (cwd) => {
  const config = require('./webpack.build.config')(cwd)

  // NODE_ENV plugin
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))

  fs.emptyDir(`${cwd}/dist`, error => {
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
  })
}
