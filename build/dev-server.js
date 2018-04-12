process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'dev'

const chokidar = require('chokidar')
const express = require('express')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const getPort = require('get-port')
const htmlUtils = require('./html/utils')
const pageList = require('./html/page-list')
const path = require('path')
const renderNunjucks = require('./html/render-nunjucks')
const webpack = require('webpack')

module.exports = cwd => {
  const config = require('./webpack.dev.config')(cwd)

  let previousHTML = ''

  function handleRender (inputPath, res) {
    renderNunjucks(cwd, inputPath)
      .then(html => {
        previousHTML = html
        htmlUtils.clearConsole()
        htmlUtils.log.success(inputPath)
        res.send(html)
      })
      .catch(error => {
        htmlUtils.clearConsole()
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
      logLevel: 'silent',
      publicPath: '/'
    })

    // Hot-reload and error display
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      heartbeat: 2000,
      log: false
    })

    // Watch for HTML or asset changes
    chokidar
      .watch(['src/**/*.njk', 'src/assets/**/*'], { cwd })
      .on('all', () => hotMiddleware.publish({ action: 'reload' }))

    app.use(devMiddleware)
    app.use(hotMiddleware)

    // Add assets path
    app.use('/assets', express.static(path.join(cwd, 'src/assets')))

    // Add Front End Styleguide assets path
    app.use('/fesg', express.static(path.join(__dirname, '../dist')))

    // Render components and send HTML
    app.get('/components/:name.html', (req, res) => {
      let name = req.params.name
      let inputPath = path.join('components', name, 'docs.njk')
      console.log(inputPath)

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
      let inputPath = path.join('prototypes', name + '.njk')

      if (!pageList.prototypes(cwd).includes(name)) {
        return res.status(404).end()
      }

      handleRender(inputPath, res)
    })

    // Start server
    app.listen(port)
  })
}
