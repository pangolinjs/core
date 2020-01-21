const test = require('ava')

const normalizePath = require('../../../../lib/utils/normalize-path')

test('converts Windows path to Unix path', t => {
  const actual = normalizePath('hello\\world\\earth.txt')
  const expected = 'hello/world/earth.txt'

  t.is(actual, expected)
})

test('leaves Unix paths as is', t => {
  const actual = normalizePath('hello/world/earth.txt')
  const expected = 'hello/world/earth.txt'

  t.is(actual, expected)
})
