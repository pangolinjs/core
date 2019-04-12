const chokidar = require('chokidar')
const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const getPort = require('../utils/get-port')
const isInContainer = require('../utils/is-in-container')
const isUnspecifiedHost = require('../utils/is-unspecified-host')
const normalizePath = require('../utils/normalize-path')
const open = require('open')
const path = require('path')
const store = require('../store')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebSocket = require('ws')

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

  // Format URL differently if Node is running in a container
  const prettyURL = isInContainer()
    ? `http://${prettyHost}:<container's external mapped port>`
    : `http://${prettyHost}:${serverPort}`

  // Create WebSocket communicate with Pangolin UI
  const websocketPort = await getPort(serverPort + 1)
  const websocketServer = new WebSocket.Server({ port: websocketPort })

  store.state.websocket.port = websocketPort

  const webpackConfig = generateConfig(context, { serverURL: prettyURL })

  const devServerOptions = {
    clientLogLevel: 'none',
    contentBase: [
      path.join(__dirname, '../../ui/dist'),
      path.join(context, 'src/public')
    ],
    host: serverHost,
    hot: true,
    quiet: true,
    watchContentBase: true
  }

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(serverPort, serverHost, () => {
    // Open web browser if flag is set
    if (options.open) {
      open(prettyURL, { app: typeof options.open === 'string' && options.open })
    }
  })

  compiler.hooks.done.tap('Done', () => {
    // Get changed files from compiler
    const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes)

    // Determine if a reload should happen
    const shouldReload = changedFiles.some(file => {
      return normalizePath(file).match(/(\.njk|\.md|\.temp\/html\.js)$/)
    })

    if (!shouldReload) {
      return
    }

    // Broadcast 'window-reload via WebSocket
    websocketServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('window-reload')
      }
    })
  })

  // Watch for Nunjucks, Markdown, and config changes
  chokidar
    .watch('src/{components,templates}/**/*.{njk,md,json}', {
      cwd: context,
      ignoreInitial: true
    })
    .on('all', () => generateImports(context))
}
