const forEachDeep = require('./for-each-deep.js')

function parse (text, { html }) {
  const ast = html(text)

  forEachDeep(ast, 'children', item => {
    if (item.attrs) {
      item.attrs.forEach(attr => {
        attr.value = attr.value && attr.value.replace(/\s+/g, ' ')
      })
    }
  })

  return ast
}

module.exports = {
  languages: [
    {
      name: 'html-enhanced',
      parsers: ['html-enhanced']
    }
  ],
  parsers: {
    'html-enhanced': {
      parse,
      astFormat: 'html'
    }
  }
}
