import renderMarkdown from '../../../../lib/utils/render-markdown'
import store from '../../../../lib/store'
import test from 'ava'

const stateBackup = Object.assign({}, store.state)

test.beforeEach('setup', t => {
  store.state.config = { project: { base: '/' } }
})

test.afterEach('cleanup', t => {
  Object.assign(store.state, stateBackup)
})

test.serial('renders markdown', t => {
  const markdown = '# Heading\nParagraph with [link](file.html)\n* List'
  const html = renderMarkdown(markdown)

  t.snapshot(html)
})

test.serial('highlights code', t => {
  const markdown = '```js\nconst test =\'Hello World\'\n```'
  const html = renderMarkdown(markdown)

  t.snapshot(html)
})

test.serial('strips ‘<h1>’', t => {
  const actual = renderMarkdown('# Heading', { removeH1: true })
  const expected = ''

  t.is(actual, expected)
})

test.serial('returns empty string on empty ‘markdown’ parameter', t => {
  const actual = renderMarkdown()
  const expected = ''

  t.is(actual, expected)
})

test.serial('returns empty string on non-string ‘markdown’ parameter', t => {
  const actualArray = renderMarkdown([])
  const actualFunction = renderMarkdown(() => {})
  const actualNumber = renderMarkdown(2)
  const actualObject = renderMarkdown({})
  const expected = ''

  t.is(actualArray, expected)
  t.is(actualFunction, expected)
  t.is(actualNumber, expected)
  t.is(actualObject, expected)
})
