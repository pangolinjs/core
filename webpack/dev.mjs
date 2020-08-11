import { blue, green } from 'kleur/colors'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import formatIP from '../lib/format-ip.mjs'
import getHostIPs from '../lib/get-host-ips.mjs'
import webpackBaseConfig from './base.mjs'

/**
 * Development webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {string} options.host Here it runs
 * @param {number} options.port Where webpack serves files
 * @param {number} options.uiPort Where fractal serves files
 */
export default function ({ context, host, port, uiPort }) {
  const webpackConfig = webpackBaseConfig({ context })
  const networkIPs = getHostIPs()

  /* eslint-disable indent */

  webpackConfig
    .mode('development')
    .devtool('eval-cheap-module-source-map')

  webpackConfig.output
    .filename('main.js')
    .publicPath(`http://${host}:${port}/`)

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
          '  - Local:   ' + blue(`http://${formatIP(host)}:${uiPort}`),
          ...networkIPs.map(ip => '  - Network: ' + blue(`http://${ip}:${uiPort}`))
        ],
        notes: [
          'Note that the development build is not optimized.',
          `To create a production build, run ${green('npm run build')}.`
        ]
      }
    }])

  /* eslint-enable indent */

  return webpackConfig.toConfig()
}
