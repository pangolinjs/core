import path from 'path'
import nunjucks from 'nunjucks'

/**
 * HTML <head> extension
 * @param {Object} options Options
 * @param {string} options.assetsPath Path to assets
 * @param {{js:string[], css:string[]}} options.assetsFiles Asset files
 */
export default function ({ assetsPath, assetsFiles }) {
  this.tags = ['head']

  this.parse = function (parser, nodes) {
    const token = parser.nextToken()
    parser.advanceAfterBlockEnd(token.value)
    return new nodes.CallExtension(this, 'run')
  }

  this.run = function (context) {
    const fromPath = path.dirname(context.ctx._env.request.path)

    if (process.env.NODE_ENV === 'development') {
      return new nunjucks.runtime.SafeString(`<script src="${assetsPath}main.js" defer></script>`)
    }

    const js = assetsFiles.js.map(file => {
      const toPath = assetsPath + file
      const relativePath = path.relative(fromPath, toPath)
      return `<script src="${relativePath}" defer></script>`
    })

    const css = assetsFiles.css.map(file => {
      const toPath = assetsPath + file
      const relativePath = path.relative(fromPath, toPath)
      return `<link rel="stylesheet" href="${relativePath}">`
    })

    return new nunjucks.runtime.SafeString(js.join('\n') + '\n' + css.join('\n'))
  }
}
