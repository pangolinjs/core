import escapeHtml from '../../../../lib/utils/escape-html'
import test from 'ava'

test('escapes HTML', t => {
  const actual = escapeHtml('<a href="#0">Hello World</a>')
  const expected = '&lt;a href=&quot;#0&quot;&gt;Hello World&lt;/a&gt;'

  t.is(actual, expected)
})
