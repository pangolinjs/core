const chokidar = require('chokidar')
const open = require('open')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebSocket = require('ws')

const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const getPort = require('../utils/get-port')
const isInContainer = require('../utils/is-in-container')
const isUnspecifiedHost = require('../utils/is-unspecified-host')
const normalizePath = require('../utils/normalize-path')
const store = require('../store')

/**
 * Start development server
 * @param {Object} options Options
 * @param {Boolean|String} options.open Open in browser
 */
module.exports = async function (options) {
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

  const context = process.cwd()
  store.setup(context)

  // Override host with CLI argument
  if (options.host) {
    store.state.config.devServer.host = options.host
  }

  // Override port with CLI argument
  if (options.port) {
    store.state.config.devServer.port = options.port
  }

  generateImports(context)

  const serverPort = await getPort(store.state.config.devServer.port)
  const serverHost = store.state.config.devServer.host

  // Format host as `localhost` if it is `0.0.0.0` or `::`
  const prettyHost = isUnspecifiedHost(serverHost)
    ? 'localhost'
    : serverHost

  // Format URL differently if Node.js is running in a container
  const localURL = isInContainer()
    ? `http://${prettyHost}:<container's external mapped port>`
    : `http://${prettyHost}:${serverPort}`

  // Create WebSocket to communicate with Pangolin.js UI
  const webSocketPort = await getPort(serverPort + 1)
  const webSocketServer = new WebSocket.Server({
    host: serverHost,
    port: webSocketPort
  })

  const webpackConfig = generateConfig(context, {
    localURL,
    serverHost,
    webSocketPort
  })

  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, webpackConfig.devServer)

  // Listen for webpack's "Done" event
  compiler.hooks.done.tap('Done', () => {
    // Get changed files from compiler
    const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes)

    // Determine if a reload should happen
    const shouldReload = changedFiles.some(file => {
      return normalizePath(file).match(/(\.njk|\.temp\/html\.js)$/)
    })

    if (shouldReload) {
      // Broadcast reload message via WebSocket
      webSocketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('reload')
        }
      })
    }
  })

  // Watch for Nunjucks and config changes
  chokidar
    .watch('src/{components,templates}/**/*.{njk,json}', {
      cwd: context,
      ignoreInitial: true
    })
    .on('all', () => generateImports(context))

  // Start dev server
  server.listen(serverPort, serverHost, () => {
    // Open web browser if flag is set
    if (options.open) {
      open(prettyURL, {
        app: typeof options.open === 'string' && options.open,
        url: true
      })
    }
  })

  // Close server and compiler on ^C
  process.on('SIGINT', () => {
    server.close()
    compiler.close(() => {})
    process.exit()
  })
}
