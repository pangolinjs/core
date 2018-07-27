const chalk = require('chalk')
const chokidar = require('chokidar')
const generateConfig = require('../config/generate')
const generateImports = require('../utils/generate-imports')
const getConfig = require('../utils/get-config')
const getPort = require('../utils/get-port')
const mount = require('koa-mount')
const normalizePath = require('../utils/normalize-path')
const opn = require('opn')
const path = require('path')
const serve = require('webpack-serve')
const serveStatic = require('koa-static')
const WebSocket = require('ws')

// TODO: Search for free port
const webSocketServer = new WebSocket.Server({ port: 12345 })

/**
 * Determine if a full page reload is necessary
 * @param {string[]} files List of changed files
 * @returns {Boolean} To reload or not to reload
 */
function shouldReload (files) {
  return files.some(file => {
    return normalizePath(file).match(/(\.njk|\.md|\.temp\/html\.js)$/)
  })
}

/**
 * Broadcast `window-reload` via WebSocket
 */
function fullReload () {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('window-reload')
    }
  })
}

/**
 * Start development server
 */
module.exports = async function () {
  // Set environment variables
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

  const context = process.cwd()

  generateImports.css(context)
  generateImports.html(context)
  generateImports.js(context)

  // Get configs
  const webpackConfig = generateConfig(context)
  const projectConfig = getConfig(context)
  const serverConfig = projectConfig.devServer || {}

  // Get free port for server
  const serverPort = await getPort(process.env.PORT || serverConfig.port)
  const serverURL = `http://localhost:${serverPort}`

  // Create webpack-serve config
  const webpackServeConfig = {
    clipboard: false,
    config: webpackConfig,
    devMiddleware: { logLevel: 'silent' },
    hotClient: { logLevel: 'silent' },
    logLevel: 'error',
    port: serverPort,
    add (app) {
      const uiPath = path.join(__dirname, '../../ui/dist')
      const assetsPath = path.join(context, 'src/assets')

      app.use(mount('/pangolin', serveStatic(uiPath)))
      app.use(mount('/assets', serveStatic(assetsPath)))
    }
  }

  // Start dev server
  serve({}, webpackServeConfig)
    .then(server => {
      let isFirstCompile = true

      server.on('build-finished', ({ stats, compiler }) => {
        if (stats.hasErrors()) return

        if (isFirstCompile) {
          isFirstCompile = false

          if (serverConfig.open) {
            opn(serverURL, { app: serverConfig.browser })
          }
        } else {
          const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes)

          if (shouldReload(changedFiles)) {
            fullReload()
          }
        }

        console.log(chalk`Pangolin dev server listening at {cyan ${serverURL}}`)
      })
    })

  const chokidarConfig = {
    cwd: context,
    ignoreInitial: true
  }

  // Watch for asset changes
  chokidar
    .watch('src/assets/**', chokidarConfig)
    .on('all', () => fullReload())

  // Watch for component markup changes
  chokidar
    .watch(['src/main.njk', 'src/components/**/*.njk'], chokidarConfig)
    .on('add', () => generateImports.html(context))
    .on('unlink', () => generateImports.html(context))

  // Watch for component docs changes
  chokidar
    .watch('src/components/**/*.md', chokidarConfig)
    .on('add', () => generateImports.html(context))
    .on('change', () => generateImports.html(context))
    .on('unlink', () => generateImports.html(context))
}