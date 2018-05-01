const chokidar = require('chokidar')
const express = require('express')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const getConfig = require('../utils/get-config')
const getPort = require('../utils/get-port')
const htmlUtils = require('../html/utils')
const merge = require('webpack-merge')
const opn = require('opn')
const pageList = require('../html/page-list')
const path = require('path')
const renderNunjucks = require('../html/render-nunjucks')
const webpack = require('webpack')

module.exports = function () {
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

  const context = process.cwd()
  const config = merge(
    require('../config/dev')(context),
    require('../config/project')(context)
  )
  const devServerConfig = getConfig(context, 'webpack.js').devServer || {}

  let previousHTML = ''

  function handleRender (inputPath, res) {
    renderNunjucks(context, inputPath)
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

  getPort(context).then(port => {
    // Format output
    // We have to delay this until we get the port
    config.plugins.push(new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Dev server running at http://localhost:${port}`]
      }
    }))

    // Create webpack compiler and express app
    const compiler = webpack(config)
    const app = express()

    compiler.plugin('done', () => {
      // Auto open in browser if config is set
      if (devServerConfig.open) {
        opn(`http://localhost:${port}`, { app: devServerConfig.browser })
      }
    })

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
      .watch(['src/**/*.njk', 'src/assets/**/*'], { cwd: context })
      .on('all', () => hotMiddleware.publish({ action: 'reload' }))

    app.use(devMiddleware)
    app.use(hotMiddleware)

    // Add assets path
    app.use('/assets', express.static(path.join(context, 'src/assets')))

    // Add Pangolin assets path
    app.use('/pangolin', express.static(path.join(__dirname, '../../dist')))

    // Render components and send HTML
    app.get('/components/:name.html', (req, res) => {
      let name = req.params.name
      let inputPath = path.join('components', name, 'docs.njk')

      if (!pageList.components(context).includes(name)) {
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

      if (!pageList.prototypes(context).includes(name)) {
        return res.status(404).end()
      }

      handleRender(inputPath, res)
    })

    // Start server
    app.listen(port)
  }).catch(error => { throw error })
}
