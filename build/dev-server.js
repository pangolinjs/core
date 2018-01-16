process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'dev'

const chokidar = require('chokidar')
const express = require('express')
const getPort = require('get-port')
const path = require('path')
const webpack = require('webpack')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const htmlUtils = require('./html/utils')
const pageList = require('./html/page-list')
const renderNunjucks = require('./html/render-nunjucks')

module.exports = cwd => {
  const config = require('./webpack.dev.config')(cwd)

  let previousHTML = ''

  function handleRender (inputPath, res) {
    renderNunjucks(cwd, inputPath)
      .then(html => {
        htmlUtils.log.success(inputPath)
        previousHTML = html
        res.send(html)
      })
      .catch(error => {
        htmlUtils.log.error(error, inputPath)
        res.send(previousHTML)
      })
  }

  getPort({ port: process.env.PORT || 8080 }).then(port => {
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
      logLevel: 'silent'
    })

    // Hot-reload and error display
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000
    })

    // Force reload after HTML or asset change
    chokidar.watch([`${cwd}/src/**/*.njk`, `${cwd}/src/assets/**/*`])
      .on('all', () => {
        hotMiddleware.publish({ action: 'reload' })
      })

    app.use(devMiddleware)
    app.use(hotMiddleware)

    // Add assets path
    app.use('/assets', express.static(`${cwd}/src/assets`))

    // Add Front End Styleguide assets path
    app.use('/fesg', express.static(path.join(__dirname, '../dist')))

    // Render components and send HTML
    app.get('/components/:name.html', (req, res) => {
      let name = req.params.name
      let inputPath = `components/${name}/docs.njk`

      if (!pageList.components(cwd).includes(name)) {
        return res.status(404).end()
      }

      handleRender(inputPath, res)
    })

    // Render prototypes and send HTML
    app.get(['/', '/:name.html'], (req, res) => {
      let name = req.path === '/'
        ? 'index'
        : req.params.name
      let inputPath = `prototypes/${name}.njk`

      if (!pageList.prototypes(cwd).includes(name)) {
        return res.status(404).end()
      }

      handleRender(inputPath, res)
    })

    // Start server
    app.listen(port)
  })
}
