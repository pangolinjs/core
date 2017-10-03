process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'dev'

const chokidar = require('chokidar')
const express = require('express')
const getPort = require('get-port')
const path = require('path')
const webpack = require('webpack')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const nunjucksError = require('./html/format-error')
const nunjucksSuccess = require('./html/format-success')
const pageList = require('./html/page-list')
const renderNunjucks = require('./html/render-nunjucks')

module.exports = (cwd) => {
  const config = require('./webpack.dev.config')(cwd)

  getPort({ port: 8080 }).then(port => {
    // Format output
    // We have to delay this until we get the port
    config.plugins.push(new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Dev server running on http://localhost:${port}`]
      }
    }))

    // Create webpack compiler and express app
    const compiler = webpack(config)
    const app = express()

    // Webpack bundle inject
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: '/',
      quiet: true
    })

    // Hot-reload and error display
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000
    })

    // Force reload after HTML or static asset change
    chokidar.watch([`${cwd}/src/**/*.njk`, `${cwd}/src/assets/**/*`])
      .on('all', () => {
        hotMiddleware.publish({ action: 'reload' })
      })

    app.use(devMiddleware)
    app.use(hotMiddleware)

    // Add static asset path
    app.use('/assets', express.static(`${cwd}/src/assets`))

    // Render components and send HTML
    app.get('/components/*.html', (req, res) => {
      let name = path.basename(req.path, '.html')
      let inputPath = `components/${name}/docs.njk`

      if (!pageList.components(cwd).includes(name)) {
        return res.status(404).end()
      }

      renderNunjucks(cwd, inputPath)
        .then(html => {
          nunjucksSuccess(inputPath)
          res.send(html)
        })
        .catch(error => nunjucksError(error))
    })

    // Render prototypes and send HTML
    app.get(['/', '/*.html'], (req, res) => {
      let name = req.path === '/'
        ? 'index'
        : path.basename(req.path, '.html')
      let inputPath = `prototypes/${name}.njk`

      if (!pageList.prototypes(cwd).includes(name)) {
        return res.status(404).end()
      }

      renderNunjucks(cwd, inputPath)
        .then(html => {
          nunjucksSuccess(inputPath)
          res.send(html)
        })
        .catch(error => nunjucksError(error))
    })

    // Start server
    app.listen(port)
  })
}
