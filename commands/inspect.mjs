import { green } from 'kleur/colors'
import util from 'util'

import webpackBuild from '../webpack/build.mjs'
import webpackDev from '../webpack/dev.mjs'
import getConfig from '../lib/get-config.mjs'

/**
 * Print webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {'dev'|'build'} options.command Command to inspect
 */
export default async function ({ context, command }) {
  const config = await getConfig({ context })

  let webpackOptions

  switch (command) {
    case 'dev':
      process.env.NODE_ENV = 'development'
      webpackOptions = webpackDev
      break
    case 'build':
      process.env.NODE_ENV = 'production'
      webpackOptions = webpackBuild
      break
    default:
      console.log('Please specify one of the following arguments:')
      console.log('  - dev')
      console.log('  - build')
      console.log(`\nFor example: ${green('npm run inspect -- dev')}`)
      return
  }

  webpackOptions = await webpackOptions({ context })

  if (typeof config.webpack === 'function') {
    config.webpack(webpackOptions)
  }

  webpackOptions = util.inspect(webpackOptions.toConfig(), {
    colors: true,
    depth: null
  })

  console.log(webpackOptions)
}
