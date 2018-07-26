const chalk = require('chalk')
const chokidar = require('chokidar')
const fullReload = require('../utils/full-reload')
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

/**
 * Determine if a full page reload is necessary
 * @param {string[]} files List of changed files
 * @returns {Boolean} To reload or not to reload
 */
function shouldReload (files) {
  return files.some(file => {
    return normalizePath(file).match(/(\.njk|\.md)$/)
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

  const config = generateConfig(context)

  // Import dev server config
  const serverConfig = getConfig(context).devServer || {}

  // Get free ports for server and socket
  const serverPort = await getPort(process.env.PORT || serverConfig.port)
  const serverURL = `http://localhost:${serverPort}`
  const webSocketPort = await getPort(serverPort + 1)
  const webSocketURL = `ws://localhost:${webSocketPort}`

  // Create webpack-serve config
  const webpackServeConfig = {
    clipboard: false,
    config,
    devMiddleware: { logLevel: 'silent' },
    hotClient: { logLevel: 'silent', port: webSocketPort },
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
          if (shouldReload(Object.keys(compiler.watchFileSystem.watcher.mtimes))) {
            fullReload(webSocketURL)
          }
        }

        console.log(chalk`Pangolin dev server listening at {cyan ${serverURL}}`)
      })
    })

  const chokidarConfig = {
    cwd: context,
    ignoreInitial: true
  }

  // Watch for Nunjucks changes
  chokidar
    .watch('src/**/*.njk', chokidarConfig)
    .on('add', () => generateImports.html(context))
    .on('unlink', () => generateImports.html(context))

  // Watch for asset changes
  chokidar
    .watch('src/assets/**', chokidarConfig)
    .on('all', () => fullReload(webSocketURL))
}
