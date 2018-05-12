const chalk = require('chalk')
const chokidar = require('chokidar')
const generateConfig = require('../config/generate')
const generateImports = require('../html/generate-imports')
const getConfig = require('../utils/get-config')
const getPort = require('../utils/get-port')
const metadata = require('../html/metadata')
const mount = require('koa-mount')
const normalizeResourcePath = require('../html/normalize-resourcepath')
const opn = require('opn')
const path = require('path')
const serve = require('webpack-serve')
const serveStatic = require('koa-static')
const webpack = require('webpack')
const WebSocket = require('ws')

/**
 * Broadcast a full reload via WebSocket
 * @param {number} port WebSocket port
 */
function fullReload (port) {
  const ws = new WebSocket(`ws://localhost:${port}`)
  const data = {
    type: 'broadcast',
    data: { type: 'window-reload' }
  }

  ws.on('open', () => {
    ws.send(JSON.stringify(data))
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
  const localURL = `http://localhost:${port}`

  // Create webpack compiler
  const compiler = webpack(config)

  // Execute after webpack finished bundling
  let isFirstCompile = true
  compiler.hooks.done.tap('pangolin', stats => {
    if (stats.hasErrors()) return

    // Auto open in browser on first compile
    if (isFirstCompile && devServerConfig.open) {
      isFirstCompile = false
      opn(localURL, { app: devServerConfig.browser })
    }

    // Always log the URL
    console.log(chalk`Pangolin dev server listening at {cyan ${localURL}}`)
  })

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
  })

  // TODO: The following is one giant race condition
  // This depends on webpack getting stuff done as
  // fast as possible before the browser reload
  // is triggered. Solution? I have no idea…

  /**
   * Execute on file addition
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function addFile (file, type) {
    const filePath = path.join(context, file)

    metadata.updateFile(normalizeResourcePath(filePath))
    generateImports[type](context)
    fullReload(wsPort)
  }

  /**
   * Execute on file removal
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function unlinkFile (file, type) {
    const filePath = path.join(context, file)

    metadata.deleteFile(normalizeResourcePath(filePath))
    generateImports[type](context)
    fullReload(wsPort)
  }

  const chokidarOptions = {
    cwd: context,
    ignoreInitial: true
  }

  // Watch for component changes
  chokidar
    .watch('src/components/**/docs.md', chokidarOptions)
    .on('change', () => fullReload(wsPort))
    .on('add', file => addFile(file, 'components'))
    .on('unlink', file => unlinkFile(file, 'components'))

  // Watch for Nunjucks changes
  chokidar
    .watch('src/**/*.njk', chokidarOptions)
    .on('change', () => fullReload(wsPort))
    .on('add', file => addFile(file, 'prototypes'))
    .on('unlink', file => unlinkFile(file, 'prototypes'))

  // Watch for asset changes
  chokidar
    .watch('src/assets/**', chokidarOptions)
    .on('all', () => fullReload(wsPort))
}
