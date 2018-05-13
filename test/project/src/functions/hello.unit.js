import test from 'ava'

import hello from './hello'

test('hello', t => {
  t.is(hello('World'), 'Hello World!')
})
