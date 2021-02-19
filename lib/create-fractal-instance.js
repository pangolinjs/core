import fractal from '@frctl/fractal'
import mandelbrot from '@frctl/mandelbrot'
import nunjucks from '@frctl/nunjucks'

import getConfig from './get-config.js'
import getPaths from './get-paths.js'
import mergeObjects from './merge-objects.js'
import PangolinHeadExtension from './pangolin-head-extension.js'

/**
 * Create Fractal instance
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {string} options.publicPath Path to assets
 * @param {{js:string[], css:string[]}} options.assets Asset filenames
 */
export default async function ({ context, publicPath, assets }) {
  const paths = getPaths({ context })
  const config = await getConfig({ context })
  const instance = fractal.create()

  const theme = mandelbrot({
    skin: config.ui.color,
    favicon: config.ui.favicon,
    format: config.ui.format,
    lang: config.ui.lang,
    information: config.ui.information,
    labels: config.ui.labels,
    panels: ['notes', 'info', 'html', 'view', 'context']
  })

  const engineOptions = mergeObjects(config.engine, {
    extensions: {
      PangolinHeadExtension: new PangolinHeadExtension({ publicPath, assets })
    }
  })

  const engine = nunjucks(engineOptions)

  instance.set('project.title', config.project.name)
  instance.set('project.author', config.project.author)
  instance.set('project.version', config.project.version)

  instance.components.engine(engine)
  instance.components.set('ext', '.njk')
  instance.components.set('path', paths.inputComponents)

  instance.docs.engine(engine)
  instance.docs.set('path', paths.inputDocs)

  instance.web.theme(theme)
  instance.web.set('static.path', paths.inputPublic)
  instance.web.set('builder.dest', paths.outputStatic)

  return instance
}
