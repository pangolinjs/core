import test from 'ava'

import hello from '../../src/functions/hello'

test('hello', t => {
  t.is(hello('World'), 'Hello World!')
})
