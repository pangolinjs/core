import fs from 'fs'
import webpack from 'webpack'

import copyDirSync from '../lib/copy-dir-sync.mjs'
import createFractalInstance from '../lib/create-fractal-instance.mjs'
import getAssetFiles from '../lib/get-asset-files.mjs'
import getConfig from '../lib/get-config.mjs'
import getPaths from '../lib/get-paths.mjs'
import getWebpackConfig from '../webpack/build.mjs'

/**
 * Build production assets and static export
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'production'

  const config = await getConfig({ context })
  const paths = getPaths({ context })
  const webpackConfig = await getWebpackConfig({ context })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackConfig)
  }

  const publicPath = webpackConfig.output.get('publicPath')
  const webpackCompiler = webpack(webpackConfig.toConfig())

  fs.rmdirSync(paths.outputAssets, { recursive: true })
  fs.rmdirSync(paths.outputBuild, { recursive: true })
  fs.rmdirSync(paths.outputStatic, { recursive: true })

  webpackCompiler.run(async (error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString({
      children: false,
      chunks: false,
      colors: true,
      modules: false
    }))

    if (stats.hasErrors()) {
      // Exit with a non-zero status code to allow CI tools to report errors.
      process.exit(1)
    }

    copyDirSync(paths.inputPublic, paths.outputBuild)

    const assets = getAssetFiles({ files: Object.keys(stats.compilation.assets) })

    const fractalInstance = await createFractalInstance({ context, publicPath, assets })
    const fractalConsole = fractalInstance.cli.console
    const fractalBuilder = fractalInstance.web.builder()

    fractalBuilder.on('progress', (completed, total) => {
      fractalConsole.update(`Fractal: Exported ${completed} of ${total} items.`, 'info')
    })

    fractalBuilder.on('error', error => {
      fractalConsole.error(error.message)
    })

    fractalBuilder.build().then(stats => {
      if (stats.errorCount) {
        fractalConsole.error('Fractal build failed.')
        process.exit(1)
      }

      fractalConsole.success('Fractal build completed.')
    })
  })
}
