const path = require('path')

module.exports = function () {
  this.tags = ['static']

  this.parse = function (parser, nodes) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)

    parser.advanceAfterBlockEnd(token)

    return new nodes.CallExtension(this, 'run', args)
  }

  this.run = function (context, url) {
    const from = path.dirname(context.ctx.output_path)
    const to = url

    return path
      .relative(from, to)
      .split(path.sep)
      .join('/')
  }
}
