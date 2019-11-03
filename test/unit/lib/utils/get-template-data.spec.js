import path from 'path'
import test from 'ava'

import getTemplateData from '../../../../lib/utils/get-template-data'

test('loads template contents', t => {
  const context = path.join(__dirname, 'fixtures')
  const actual = getTemplateData(context)
  const expected = {
    'default.njk': 'Hello World\n',
    'custom.njk': 'Foo Bar Baz\n'
  }

  t.deepEqual(actual, expected)
})
