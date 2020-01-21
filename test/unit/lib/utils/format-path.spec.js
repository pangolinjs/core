const test = require('ava')

const formatPath = require('../../../../lib/utils/format-path')

test('formats single segment', t => {
  const actual = formatPath('test')
  const expected = 'test'

  t.is(actual, expected)
})

test('formats multiple segments', t => {
  const actual = formatPath('hello', 'world')
  const expected = 'hello/world'

  t.is(actual, expected)
})

test('formats multiple segments with file extensions', t => {
  const actual = formatPath('hello', 'world', 'earth.txt')
  const expected = 'hello/world/earth.txt'

  t.is(actual, expected)
})
