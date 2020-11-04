import fs from 'fs/promises'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import getConfig from '../lib/get-config.mjs'
import getPaths from '../lib/get-paths.mjs'
import getPort from '../lib/get-port.mjs'
import getWebpackConfig from '../webpack/dev.mjs'

/**
 * Run development server
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'development'

  const config = await getConfig({ context })
  const paths = getPaths({ context })
  const host = '0.0.0.0'
  const webpackPort = await getPort(8080)
  const fractalPort = await getPort(8081)
  const webpackConfig = await getWebpackConfig({ context, host, port: webpackPort })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackConfig)
  }

  const publicPath = webpackConfig.output.get('publicPath')

  const webpackCompiler = webpack(webpackConfig.toConfig())
  const webpackServer = new WebpackDevServer(webpackCompiler, {
    hot: true,
    contentBase: false,
    noInfo: true,
    clientLogLevel: 'error',
    publicPath,
    proxy: {
      [`!${publicPath}**`]: `http://${host}:${fractalPort}`
    }
  })

  await fs.rm(paths.outputAssets, { recursive: true, force: true })

  webpackServer.listen(webpackPort, host, async () => {
    const fractalInstance = await createFractalInstance({ context, publicPath })
    const fractalServer = fractalInstance.web.server({
      sync: true,
      port: fractalPort,
      syncOptions: {
        ui: false,
        ghostMode: false,
        watchOptions: {
          // webpack-dev-server already includes reloading, so we ignore
          // everything except Fractal-related files.
          ignored: file => !/\.(njk|yml|json|md)$/.test(file)
        }
      }
    })

    fractalServer.on('error', error => {
      fractalInstance.cli.console.error(error.message)
    })

    fractalServer.on('stopped', () => {
      // Exit the whole application after the webpack-dev-server has been closed.
      webpackServer.close(() => process.exit())
    })

    process.on('SIGINT', () => {
      // webpack-dev-server will be closed after the Fractal server has been stopped.
      // See above listener for the Fractal 'stopped' event.
      fractalServer.stop()
    })

    fractalServer.start()
  })
}
