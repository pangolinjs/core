import test from 'ava'

import mergeObjects from '../../../lib/merge-objects.mjs'

test('shallow merges', t => {
  const target = {
    hello: 'world'
  }

  const source = {
    hello: 'galaxy',
    foo: 'bar'
  }

  const result = mergeObjects(target, source)
  t.snapshot(result)
})

test('deep merges', t => {
  const target = {
    species: {
      me: 'Human',
      you: 'Wookie'
    }
  }

  const source = {
    species: {
      you: 'Togruta'
    }
  }

  const result = mergeObjects(target, source)
  t.snapshot(result)
})
