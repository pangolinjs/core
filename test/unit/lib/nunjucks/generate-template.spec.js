import generateSource from '../../../../lib/nunjucks/generate-source'
import test from 'ava'

test('generates source', t => {
  const generatedSource = generateSource({
    template: 'blog.njk',
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(generatedSource)
})
