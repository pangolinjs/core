import generateTemplate from '../../../../lib/nunjucks/generate-template'
import test from 'ava'

test('generates default template', t => {
  const template = generateTemplate({
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(template)
})

test('generates custom template', t => {
  const template = generateTemplate({
    template: 'blog.njk',
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(template)
})
