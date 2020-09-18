import fs from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import getConfig from '../lib/get-config.mjs'
import getPath from '../lib/get-path.mjs'
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

  const assetsPath = getPath({ context }).assets

  const host = '0.0.0.0'
  const fractalPort = await getPort(8080)
  const webpackPort = await getPort(8081)

  fs.rmdirSync(assetsPath, { recursive: true })

  const webpackConfig = await getWebpackConfig({
    context,
    host,
    port: webpackPort,
    uiPort: fractalPort
  })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackConfig)
  }

  const webpackCompiler = webpack(webpackConfig.toConfig())
  const webpackServer = new WebpackDevServer(webpackCompiler, {
    hot: true,
    contentBase: false,
    sockPort: webpackPort,
    noInfo: true,
    clientLogLevel: 'error',
    headers: {
      'access-control-allow-origin': '*'
    }
  })

  webpackServer.listen(webpackPort, host, async () => {
    const fractalInstance = await createFractalInstance({
      context,
      assetsPath: webpackConfig.output.get('publicPath')
    })

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

    fractalServer.start()
  })
}
