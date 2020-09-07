import webpackBuildConfig from './build.mjs'

/**
 * Static export webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  const webpackConfig = await webpackBuildConfig({ context })

  /* eslint-disable indent */

  webpackConfig.output
    .publicPath('/assets/')

  /* eslint-enable indent */

  return webpackConfig
}
