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

test('throws Error on missing options', t => {
  const error = t.throws(() => {
    generatePreviewTemplate({ body: 'test' })
  }, Error)

  t.is(error.message, 'options.head missing')
})

test('throws TypeError on wrong option types', t => {
  const errorTemplate = t.throws(() => {
    generatePreviewTemplate({
      template: 42,
      head: 'test',
      body: 'test'
    })
  }, TypeError)

  const errorHead = t.throws(() => {
    generatePreviewTemplate({
      head: 1337,
      body: 'test'
    })
  }, TypeError)

  const errorBody = t.throws(() => {
    generatePreviewTemplate({
      head: 'test',
      body: 3.142
    })
  }, TypeError)

  t.is(errorTemplate.message, 'options.template must be of type string')
  t.is(errorHead.message, 'options.head must be of type string')
  t.is(errorBody.message, 'options.body must be of type string')
})
