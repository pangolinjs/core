import test from 'ava'
import sayHello from '../../src/functions/say-hello'

test('say-hello', (t) => {
  t.is(sayHello('World'), 'Hello World!')
})
