import fs from 'fs'
import webpack from 'webpack'

import copyDirSync from '../lib/copy-dir-sync.mjs'
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

  fs.rmdirSync(assetsPath, { recursive: true })
  fs.rmdirSync(buildPath, { recursive: true })

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

    copyDirSync(publicPath, buildPath)
  })
}
