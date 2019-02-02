import store from '../../../lib/store'
import test from 'ava'

test('has pre-defined state structure', t => {
  const actual = store.state
  const expected = {
    components: null,
    config: null,
    cwd: null,
    modern: false,
    websocket: {
      port: null
    }
  }

  t.deepEqual(actual, expected)
})
