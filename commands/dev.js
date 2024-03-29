import fs from 'fs/promises'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import createFractalInstance from '../lib/create-fractal-instance.js'
import getConfig from '../lib/get-config.js'
import getPaths from '../lib/get-paths.js'
import getPort from '../lib/get-port.js'
import getWebpackConfig from '../webpack/dev.js'

/**
 * Run development server
 * @param {Object} options Options
 * @param {string} options.context Working directorys
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'development'

  const config = await getConfig({ context })
  const paths = getPaths({ context })
  const host = '0.0.0.0'
  const webpackPort = await getPort(8080)
  const fractalPort = await getPort(webpackPort + 1)
  const webpackConfig = await getWebpackConfig({ context, host, port: webpackPort })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackConfig)
  }

  const publicPath = webpackConfig.output.get('publicPath')

  const webpackServerOptions = {
    static: [
      {
        publicPath,
        watch: false
      }
    ],
    client: {
      logging: 'none'
    },
    proxy: {
      [`!${publicPath}**`]: `http://${host}:${fractalPort}`
    }
  }

  const webpackCompiler = webpack(webpackConfig.toConfig())
  const webpackServer = new WebpackDevServer(webpackServerOptions, webpackCompiler)

  await fs.rm(paths.outputAssets, { recursive: true, force: true })
  await webpackServer.start(webpackPort, host)

  const fractalServerOptions = {
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
  }

  const fractalInstance = await createFractalInstance({ context, publicPath })
  const fractalServer = fractalInstance.web.server(fractalServerOptions)

  fractalServer.on('error', error => {
    fractalInstance.cli.console.error(error.message)
  })

  fractalServer.on('stopped', async () => {
    await webpackServer.stop()

    // Exit the whole application after the webpack-dev-server has been closed.
    process.exit()
  })

  process.on('SIGINT', () => {
    // webpack-dev-server will be closed after the Fractal server has been stopped.
    // See above listener for the Fractal 'stopped' event.
    fractalServer.stop()
  })

  fractalServer.start()
}
