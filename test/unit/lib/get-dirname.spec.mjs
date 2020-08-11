import test from 'ava'

import getDirname from '../../../lib/get-dirname.mjs'

test('gets current file’s dirname', t => {
  const result = getDirname(import.meta.url)
  t.true(result.endsWith('/test/unit/lib'))
})
