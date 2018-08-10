import renderMarkdown from '../../../../lib/utils/render-markdown'
import store from '../../../../lib/store'
import test from 'ava'

const markdown = `# Heading

Paragraph with [link](file.html)

* List`

const html = `<h1 id="heading">Heading</h1>
<p>Paragraph with <a href="/file.html">link</a></p>
<ul>
<li>List</li>
</ul>
`

test.before(t => {
  store.config = { project: { base: '/' } }
})

test.after(t => {
  store.config = null
})

test('renders markdown', t => {
  const actual = renderMarkdown(markdown)
  const expected = html

  t.is(actual, expected)
})

test('strips ‘<h1>’', t => {
  const actual = renderMarkdown('# Heading', { removeH1: true })
  const expected = ''

  t.is(actual, expected)
})

test('returns empty string on empty ‘markdown’ parameter', t => {
  const actual = renderMarkdown()
  const expected = ''

  t.is(actual, expected)
})

test('returns empty string on non-string ‘markdown’ parameter', t => {
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
