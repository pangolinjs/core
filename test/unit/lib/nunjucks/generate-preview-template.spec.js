import generatePreviewTemplate from '../../../../lib/nunjucks/generate-preview-template'
import test from 'ava'

test('generates default template', t => {
  const template = generatePreviewTemplate({
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(template)
})

test('generates custom template', t => {
  const template = generatePreviewTemplate({
    template: 'blog.njk',
    head: '<link rel="stylesheet" href="main.css">',
    body: 'Hello World'
  })

  t.snapshot(template)
})
