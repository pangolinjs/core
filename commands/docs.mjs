import fs from 'fs/promises'

import build from './build.mjs'
import createFractalInstance from '../lib/create-fractal-instance.mjs'
import getAssetFiles from '../lib/get-asset-files.mjs'
import getPaths from '../lib/get-paths.mjs'

/**
 * Create docs for static hosting
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'production'

  const paths = getPaths({ context })

  build({ context }, async (_, { stats, webpackConfig }) => {
    const publicPath = webpackConfig.output.get('publicPath')
    const assets = getAssetFiles({ files: Object.keys(stats.compilation.assets) })

    const fractalInstance = await createFractalInstance({ context, publicPath, assets })
    const fractalConsole = fractalInstance.cli.console
    const fractalBuilder = fractalInstance.web.builder()

    await fs.rm(paths.outputStatic, { recursive: true, force: true })

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
