import fs from 'fs/promises'
import webpack from 'webpack'

import copyDir from '../lib/copy-dir.js'
import getConfig from '../lib/get-config.js'
import getPaths from '../lib/get-paths.js'
import getWebpackConfig from '../webpack/build.js'

/**
 * Build production assets
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }, callback) {
  process.env.NODE_ENV = 'production'

  const config = await getConfig({ context })
  const paths = getPaths({ context })
  const webpackConfig = await getWebpackConfig({ context })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackConfig)
  }

  const webpackCompiler = webpack(webpackConfig.toConfig())

  await fs.rm(paths.outputAssets, { recursive: true, force: true })
  await fs.rm(paths.outputBuild, { recursive: true, force: true })

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

    await copyDir(paths.inputPublic, paths.outputBuild)

    callback?.(error, { stats, webpackConfig })
  })
}
