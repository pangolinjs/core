import test from 'ava'

import getPaths from '../../../lib/get-paths.mjs'

test('gets paths', t => {
  const result = getPaths({ context: 'test' })
  t.snapshot(result)
})
