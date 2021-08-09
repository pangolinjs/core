import { blue, green } from 'kleur/colors'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import formatIP from '../lib/format-ip.js'
import getHostIPs from '../lib/get-host-ips.js'
import webpackBaseConfig from './base.js'

/**
 * Development webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {string} options.host Here it runs
 * @param {number} options.port Where webpack serves files
 */
export default async function ({ context, host, port }) {
  const webpackConfig = await webpackBaseConfig({ context })
  const networkIPs = getHostIPs()

  /* eslint-disable indent */

  webpackConfig
    .mode('development')
    .devtool('eval-cheap-module-source-map')
    .stats('none')
    .set('infrastructureLogging', { level: 'warn' })

  webpackConfig.output
    .filename('main.js')

  webpackConfig.module.rule('css')
    .use('style-loader')
      .before('css-loader')
      .loader('style-loader')
      .end()

  webpackConfig.plugin('friendly-errors')
    .use(FriendlyErrorsPlugin, [{
      compilationSuccessInfo: {
        messages: [
          'Pangolin.js dev server running at:',
          '  - Local:   ' + blue(`http://${formatIP(host)}:${port}`),
          ...networkIPs.map(ip => '  - Network: ' + blue(`http://${ip}:${port}`))
        ],
        notes: [
          'Note that the development build is not optimized.',
          `To create a production build, run ${green('npm run build')}.`
        ]
      }
    }])

  /* eslint-enable indent */

  return webpackConfig
}
