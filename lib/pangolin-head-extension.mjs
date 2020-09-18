import path from 'path'
import nunjucks from 'nunjucks'

/**
 * Pangolin <head> extension
 * @param {Object} options Options
 * @param {string} options.publicPath Path to assets
 * @param {{js:string[], css:string[]}} options.assets Asset files
 */
export default function ({ publicPath, assets }) {
  this.tags = ['pangolin_head']

  this.parse = function (parser, nodes) {
    const token = parser.nextToken()
    parser.advanceAfterBlockEnd(token.value)
    return new nodes.CallExtension(this, 'run')
  }

  this.run = function (context) {
    const fromPath = path.dirname(context.ctx._env.request.path)

    if (process.env.NODE_ENV === 'development') {
      return new nunjucks.runtime.SafeString(`<script src="${publicPath}main.js" defer></script>`)
    }

    const js = assets.js.map(file => {
      const toPath = publicPath + file
      const relativePath = path.relative(fromPath, toPath)
      return `<script src="${relativePath}" defer></script>`
    })

    const css = assets.css.map(file => {
      const toPath = publicPath + file
      const relativePath = path.relative(fromPath, toPath)
      return `<link rel="stylesheet" href="${relativePath}">`
    })

    return new nunjucks.runtime.SafeString(js.join('\n') + '\n' + css.join('\n'))
  }
}
