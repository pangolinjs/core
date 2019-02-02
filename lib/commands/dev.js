const chokidar = require('chokidar')
const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const getPort = require('../utils/get-port')
const normalizePath = require('../utils/normalize-path')
const opn = require('opn')
const path = require('path')
const store = require('../store')
const WebSocket = require('ws')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

/**
 * Start development server
 */
module.exports = async function () {
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'
  process.env.BROWSERSLIST_ENV = 'legacy'

  const context = process.cwd()
  store.setup(context)

  generateImports(context)

  // Get free port for server
  const serverPort = await getPort(store.state.config.devServer.port)
  const serverHost = 'localhost'
  const serverURL = `http://${serverHost}:${serverPort}`

  // Create WebSocket communicate with Pangolin UI
  const websocketPort = await getPort(serverPort + 1)
  const websocketServer = new WebSocket.Server({ port: websocketPort })

  store.state.websocket.port = websocketPort

  const webpackConfig = generateConfig(context, { serverURL })

  const devServerOptions = {
    clientLogLevel: 'none',
    contentBase: [
      path.join(__dirname, '../../ui/dist'),
      path.join(context, 'src/public')
    ],
    host: 'localhost',
    hot: true,
    quiet: true,
    watchContentBase: true
  }

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(serverPort, serverHost, () => {
    // Open web browser if config option is set
    if (store.state.config.devServer.open) {
      opn(serverURL, { app: store.state.config.devServer.browser })
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
