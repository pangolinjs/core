const chalk = require('chalk')
const chokidar = require('chokidar')
const fullReload = require('../utils/full-reload')
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

const triggerRE = /(\.njk|\.temp\/(components|prototypes)\.js|docs\.md)$/

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

/**
 * Start development server
 */
module.exports = async function () {
  // Set environment variables
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

  const context = process.cwd()
  metadata.startup(context)
  const config = generateConfig(context)

  // Import dev server config
  const serverConfig = getConfig(context, 'webpack.js').devServer || {}

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
      const tempPath = path.join(__dirname, '../../docs/dist')
      const assetsPath = path.join(context, 'src/assets')

      app.use(mount('/pangolin', serveStatic(tempPath)))
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

  /**
   * Execute on file addition
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function handleAdd (file, type) {
    const filePath = path.join(context, file)

    metadata.updateFile(normalizePath(filePath))
    generateImports[type](context)
  }

  /**
   * Execute on file removal
   * @param {string} file File path
   * @param {'components'|'prototypes'} type Page type
   */
  function handleUnlink (file, type) {
    const filePath = path.join(context, file)

    metadata.deleteFile(normalizePath(filePath))
    generateImports[type](context)
  }

  const chokidarConfig = {
    cwd: context,
    ignoreInitial: true
  }

  // Watch for component changes
  chokidar
    .watch('src/components/**/docs.md', chokidarConfig)
    .on('add', file => handleAdd(file, 'components'))
    .on('unlink', file => handleUnlink(file, 'components'))

  // Watch for Nunjucks changes
  chokidar
    .watch('src/**/*.njk', chokidarConfig)
    .on('add', file => handleAdd(file, 'prototypes'))
    .on('unlink', file => handleUnlink(file, 'prototypes'))

  // Watch for asset changes
  chokidar
    .watch('src/assets/**', chokidarConfig)
    .on('all', () => fullReload(webSocketURL))
}
