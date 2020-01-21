const test = require('ava')

const generateSource = require('../../../../lib/nunjucks/generate-source')

test('generates source', t => {
  const generatedSource = generateSource({
    template: 'blog.njk',
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(generatedSource)
})
