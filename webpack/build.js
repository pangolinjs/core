import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import BundleAnalyzer from 'webpack-bundle-analyzer'
import CSSExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'

import generateOutputFilename from '../lib/generate-output-filename.js'
import getConfig from '../lib/get-config.js'
import getPaths from '../lib/get-paths.js'
import webpackBaseConfig from './base.js'

/**
 * Production webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  const projectConfig = await getConfig({ context })
  const webpackConfig = await webpackBaseConfig({ context })
  const paths = getPaths({ context })

  /* eslint-disable indent */

  webpackConfig
    .mode('production')
    .devtool('source-map')

  webpackConfig.output
    .path(paths.outputAssets)
    .filename(generateOutputFilename({
      type: 'js',
      hash: projectConfig.hashFiles
    }))

  // CSS

  webpackConfig.module.rule('css')
    .use('css-extract-loader')
      .before('css-loader')
      .loader(CSSExtractPlugin.loader)
      .end()
    .use('cssnano-loader')
      .after('css-loader')
      .loader('postcss-loader')
      .options({
        postcssOptions: {
          plugins: [cssnano({
            preset: ['default', {
              mergeLonghand: false,
              mergeRules: false
            }]
          })]
        }
      })
      .end()

  // Plugins

  webpackConfig.plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: generateOutputFilename({
        type: 'css',
        hash: projectConfig.hashFiles
      })
    }])

  webpackConfig.plugin('manifest')
    .use(WebpackManifestPlugin)

  webpackConfig.plugin('bundle-analyzer')
    .use(BundleAnalyzer.BundleAnalyzerPlugin, [{
      analyzerMode: 'static',
      openAnalyzer: false
    }])

  /* eslint-enable indent */

  return webpackConfig
}
