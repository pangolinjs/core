import test from 'ava'

import getPath from '../../../lib/get-path.mjs'

test('gets paths', t => {
  const result = getPath({ context: 'test' })
  t.snapshot(result)
})
