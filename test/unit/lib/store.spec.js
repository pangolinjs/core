const test = require('ava')

const store = require('../../../lib/store')

test('has pre-defined state structure', t => {
  const actual = store.state
  const expected = {
    components: null,
    templates: null,
    config: null,
    cwd: null,
    modern: false
  }

  t.deepEqual(actual, expected)
})
