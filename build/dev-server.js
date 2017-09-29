process.env.NODE_ENV = 'development'
process.env.FESG_ENV = 'dev'

const chokidar = require('chokidar')
const express = require('express')
const getPort = require('get-port')
const path = require('path')
const renderHTML = require('./render-html')
const webpack = require('webpack')

const FriendlyErrors = require('friendly-errors-webpack-plugin')

module.exports = (cwd) => {
  const config = require('./webpack.dev.config')(cwd)

  getPort({ port: 8080 }).then(port => {
    // Format output
    // We have to delay this until we get the port
    config.plugins.push(new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [`Dev server running on http://localhost:${port}`]
      }
    }))

    // Create webpack compiler and express app
    const compiler = webpack(config)
    const app = express()

    // Webpack bundle inject
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
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

    // Render prototypes and send HTML
    app.get(/.*(\/|\.html)$/, (req, res) => {
      let fileName = req.path === '/'
        ? '/index'
        : path.basename(req.path, '.html')

      renderHTML.prototypes(cwd, `${fileName}.njk`)
        .then(html => {
          res.send(html)
        })
        .catch(error => {
          console.error(error)
        })
    })

    // Start server
    app.listen(port)
  })
}
