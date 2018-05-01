const nunjucks = require('nunjucks')
const showdown = require('showdown')

const showdownConverter = new showdown.Converter({
  noHeaderId: true,
  simpleLineBreaks: true
})

const htmlUtils = require('./utils')

// Cache templates
const templates = {
  section: htmlUtils.loadTemplate('section')
}

module.exports = function () {
  this.tags = ['section']

  this.parse = function (parser, nodes, lexer) {
    let token = parser.nextToken()

    let args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    let body = parser.parseUntilBlocks('usage', 'code', 'endsection')
    let usage
    let code

    if (parser.skipSymbol('usage')) {
      parser.skip(lexer.TOKEN_BLOCK_END)
      usage = parser.parseUntilBlocks('code', 'endsection')
    }

    if (parser.skipSymbol('code')) {
      parser.skip(lexer.TOKEN_BLOCK_END)
      code = parser.parseUntilBlocks('endsection')
    }

    parser.advanceAfterBlockEnd()

    return new nodes.CallExtension(this, 'run', args, [body, usage, code])
  }

  this.run = function (context, args, body, usage, code) {
    let bodyHTML = null
    let usageHTML = null
    let codeHTML = null

    if (body) {
      bodyHTML = new nunjucks.runtime.SafeString(body())
    }

    if (usage) {
      let markdown = usage().split(/(?:\r\n|\n|\r)/).map(line => {
        return line.replace(/^\s+/gm, '')
      }).join('\n')

      let html = showdownConverter.makeHtml(markdown)

      usageHTML = new nunjucks.runtime.SafeString(html)
    }

    if (code) {
      codeHTML = code().trim()
    }

    let html = new nunjucks.Template(templates.section).render({
      background: args.background,
      width: args.width,
      title: args.title,
      description: args.description,
      body: bodyHTML,
      usage: usageHTML,
      code: codeHTML
    })

    return new nunjucks.runtime.SafeString(html)
  }
}
