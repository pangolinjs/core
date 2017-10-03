const nunjucks = require('nunjucks')

const loadTemplate = require('./load-template')

// Cache templates
const templates = {
  section: loadTemplate('section')
}

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
    let html = new nunjucks.Template(templates.section).render({
      background: args.background,
      width: args.width,
      title: args.title,
      description: args.description,
      body: new nunjucks.runtime.SafeString(body())
    })

    return new nunjucks.runtime.SafeString(html)
  }
}
