import test from 'ava'

import getPort from '../../../lib/get-port.mjs'

test('gets unused port', async t => {
  const result = await getPort(1337)
  t.is(result, 1337)
})
