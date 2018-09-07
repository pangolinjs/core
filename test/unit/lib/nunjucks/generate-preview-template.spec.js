import generatePreviewTemplate from '../../../../lib/nunjucks/generate-preview-template'
import test from 'ava'

test('generates default template', t => {
  const template = generatePreviewTemplate('Hello World')

  t.snapshot(template)
})

test('generates custom template', t => {
  const template = generatePreviewTemplate('Hello World', 'test.njk')

  t.snapshot(template)
})
