const fs = require('fs-extra')
const nunjucks = require('nunjucks')
const path = require('path')

const sectionTemplate = fs.readFileSync(
  path.resolve(__dirname, '../../docs/templates/section.njk')
).toString()

module.exports = function () {
  this.tags = ['section']

  this.parse = function (parser, nodes, lexer) {
    let token = parser.nextToken()

    let args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    let body = parser.parseUntilBlocks('endsection')
    parser.advanceAfterBlockEnd()

    return new nodes.CallExtension(this, 'run', args, [body])
  }

  this.run = function (context, args, body) {
    let html = new nunjucks.Template(sectionTemplate).render({
      background: args.background,
      width: args.width,
      title: args.title,
      description: args.description,
      body: new nunjucks.runtime.SafeString(body())
    })

    return new nunjucks.runtime.SafeString(html)
  }
}
