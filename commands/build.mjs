import fs from 'fs'
import webpack from 'webpack'

import copyDirSync from '../lib/copy-dir-sync.mjs'
import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/build.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Build production assets and static export
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'production'

  const assetsPath = getPath({ context }).assets
  const buildPath = getPath({ context }).build
  const publicPath = getPath({ context }).public
  const staticPath = getPath({ context }).static

  fs.rmdirSync(assetsPath, { recursive: true })
  fs.rmdirSync(buildPath, { recursive: true })
  fs.rmdirSync(staticPath, { recursive: true })

  const webpackOptions = await createWebpackOptions({ context })
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

    copyDirSync(publicPath, buildPath)

    const fractalInstance = await createFractalInstance({
      context,
      assetsPath: webpackOptions.output.publicPath
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
