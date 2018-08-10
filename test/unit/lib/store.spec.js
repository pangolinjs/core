import store from '../../../lib/store'
import test from 'ava'

test('has pre-defined structure', t => {
  const actual = store
  const expected = {
    components: null,
    config: null,
    websocket: {
      port: null
    }
  }

  t.deepEqual(actual, expected)
})
