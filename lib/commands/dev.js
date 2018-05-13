const chalk = require('chalk')
const chokidar = require('chokidar')
const generateConfig = require('../config/generate')
const generateImports = require('../html/generate-imports')
const getConfig = require('../utils/get-config')
const getPort = require('../utils/get-port')
const metadata = require('../html/metadata')
const mount = require('koa-mount')
const normalizePath = require('../utils/normalize-path')
const opn = require('opn')
const path = require('path')
const serve = require('webpack-serve')
const serveStatic = require('koa-static')
const webpack = require('webpack')
const WebSocket = require('ws')

const triggerRE = /(\.njk|\.temp\/(components|prototypes)\.js|docs\.md)$/

/**
 * Broadcast a full reload via WebSocket
 * @param {number} url WebSocket URL
 */
function fullReload (url) {
  const ws = new WebSocket(url)
  const data = {
    type: 'broadcast',
    data: { type: 'window-reload' }
  }

  ws.on('open', () => {
    ws.send(JSON.stringify(data))
  })
}

/**
 * Determine a full page reload
 * @param {string[]} files List of changed files
 * @returns {Boolean} To reload or not to reload
 */
function shouldReload (files) {
  return files.some(file => {
    return normalizePath(file).match(triggerRE)
  })
}

module.exports = async function () {
  // Set environment variables
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

  const context = process.cwd()
  metadata.startup(context)
  const config = generateConfig(context)

  // Import dev server config and get a free port
  const devServerConfig = getConfig(context, 'webpack.js').devServer || {}
  const port = await getPort(process.env.PORT || devServerConfig.port)
  const wsPort = await getPort(port + 1)

  const serverURL = `http://localhost:${port}`
  const wsURL = `ws://localhost:${wsPort}`

  // Create webpack compiler
  const compiler = webpack(config)

  // Start dev server
  serve({
    clipboard: false,
    compiler,
    dev: { logLevel: 'silent' },
    hot: { logLevel: 'silent', port: wsPort },
    logLevel: 'error',
    port,
    add (app) {
      const tempPath = path.join(__dirname, '../../docs/dist')
      app.use(mount('/pangolin', serveStatic(tempPath)))

      const assetsPath = path.join(context, 'src/assets')
      app.use(mount('/assets', serveStatic(assetsPath)))
    }
  }).then(server => {
    let isFirstCompile = true

    server.on('build-finished', ({ stats, compiler }) => {
      if (stats.hasErrors()) return

      if (isFirstCompile) {
        isFirstCompile = false

        if (devServerConfig.open) {
          opn(serverURL, { app: devServerConfig.browser })
        }
      } else {
        if (shouldReload(Object.keys(compiler.watchFileSystem.watcher.mtimes))) {
          fullReload(wsURL)
        }
      }

      console.log(chalk`Pangolin dev server listening at {cyan ${serverURL}}`)
    })
  })

  /**
   * Execute on file addition
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function addFile (file, type) {
    const filePath = path.join(context, file)

    metadata.updateFile(normalizePath(filePath))
    generateImports[type](context)
  }

  /**
   * Execute on file removal
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function unlinkFile (file, type) {
    const filePath = path.join(context, file)

    metadata.deleteFile(normalizePath(filePath))
    generateImports[type](context)
  }

  const chokidarOptions = {
    cwd: context,
    ignoreInitial: true
  }

  // Watch for component changes
  chokidar
    .watch('src/components/**/docs.md', chokidarOptions)
    .on('add', file => addFile(file, 'components'))
    .on('unlink', file => unlinkFile(file, 'components'))

  // Watch for Nunjucks changes
  chokidar
    .watch('src/**/*.njk', chokidarOptions)
    .on('add', file => addFile(file, 'prototypes'))
    .on('unlink', file => unlinkFile(file, 'prototypes'))

  // Watch for asset changes
  chokidar
    .watch('src/assets/**', chokidarOptions)
    .on('all', () => fullReload(wsURL))
}
