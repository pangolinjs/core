import fractal from '@frctl/fractal'
import mandelbrot from '@frctl/mandelbrot'
import nunjucks from '@frctl/nunjucks'
import path from 'path'

import getConfig from './get-config.mjs'
import getDirname from './get-dirname.mjs'
import getPath from './get-path.mjs'
import mergeObjects from './merge-objects.mjs'
import PangolinHeadExtension from './pangolin-head-extension.mjs'

/**
 * Create Fractal instance
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {string} options.assetsPath Path to assets
 * @param {{js:string[], css:string[]}} options.assetsFiles Asset filenames
 */
export default async function ({ context, assetsPath, assetsFiles }) {
  const dirname = getDirname(import.meta.url)

  const componentsPath = getPath({ context }).components
  const docsPath = getPath({ context }).docs
  const publicPath = getPath({ context }).public
  const staticPath = getPath({ context }).static

  const config = await getConfig({ context })
  const instance = fractal.create()

  const theme = mandelbrot({
    skin: config.ui.color,
    favicon: config.ui.favicon,
    format: config.ui.format,
    lang: config.ui.lang,
    panels: ['notes', 'info', 'html', 'view', 'context'],
    labels: {
      version: 'Version'
    }
  })

  const engineOptions = mergeObjects(config.engine, {
    extensions: {
      PangolinHeadExtension: new PangolinHeadExtension({ assetsPath, assetsFiles })
    }
  })

  const engine = nunjucks(engineOptions)

  theme.addLoadPath(path.join(dirname, '..', 'theme', 'views'))

  instance.set('project.title', config.project.name)
  instance.set('project.author', config.project.author)
  instance.set('project.version', config.project.version)

  instance.components.engine(engine)
  instance.components.set('ext', '.njk')
  instance.components.set('path', componentsPath)

  instance.docs.engine(engine)
  instance.docs.set('path', docsPath)

  instance.web.theme(theme)
  instance.web.set('static.path', publicPath)
  instance.web.set('builder.dest', staticPath)

  return instance
}
