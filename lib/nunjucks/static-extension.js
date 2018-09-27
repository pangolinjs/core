const store = require('../store')

/**
 * Nunjucks static URL extension
 */
module.exports = function () {
  this.tags = ['static']

  this.parse = function (parser, nodes) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)

    parser.advanceAfterBlockEnd(token)

    return new nodes.CallExtension(this, 'run', args)
  }

  this.run = function (context, url) {
    if (process.env.PANGOLIN_ENV === 'dev') {
      return '/' + url
    }

    return store.state.config.project.base + url
  }
}
