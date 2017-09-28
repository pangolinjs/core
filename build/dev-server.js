process.env.NODE_ENV = 'development'

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

    const compiler = webpack(config)
    const app = express()

    // Webpack bundle output
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
      quiet: true
    })

    // Hot-reload and error display
    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000
    })

    // Force reload after HTML change
    chokidar.watch(`${cwd}/**/*.njk`)
      .on('all', (event, path) => {
        hotMiddleware.publish({ action: 'reload' })
      })

    app.use(devMiddleware)
    app.use(hotMiddleware)

    app.use(`${cwd}/src/static`, express.static('./static'))

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

    app.listen(port)
  })
}
