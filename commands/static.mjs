import fs from 'fs'
import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/static.mjs'
import getAssetFiles from '../lib/get-asset-files.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Build production assets and static export
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'production'

  const assetsPath = getPath({ context }).assets
  const staticPath = getPath({ context }).static

  fs.rmdirSync(assetsPath, { recursive: true })
  fs.rmdirSync(staticPath, { recursive: true })

  const webpackOptions = (await createWebpackOptions({ context })).toConfig()
  const webpackCompiler = webpack(webpackOptions)

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

    const fractalInstance = await createFractalInstance({
      context,
      assetsPath: webpackOptions.output.publicPath,
      assetsFiles: getAssetFiles({ files: Object.keys(stats.compilation.assets) })
    })

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
