import { green } from 'kleur/colors'
import util from 'util'

import buildConfig from '../webpack/build.mjs'
import devConfig from '../webpack/dev.mjs'
import staticConfig from '../webpack/static.mjs'

/**
 * Print webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {'dev'|'build'} options.command Command to inspect
 */
export default async function ({ context, command }) {
  let config

  switch (command) {
    case 'dev':
      config = devConfig
      break
    case 'build':
      config = buildConfig
      break
    case 'static':
      config = staticConfig
      break
    default:
      console.log(`Please specify one of the following arguments:`)
      console.log(`  - dev`)
      console.log(`  - build`)
      console.log(`  - static`)
      console.log(`\nFor example: ${green('npm run inspect -- dev')}`)
      return
  }

  config = (await config({ context })).toConfig()

  config = util.inspect(config, {
    colors: true,
    depth: null
  })

  console.log(config)
}
