import formatName from '../../../../lib/utils/format-name'
import test from 'ava'

test('formats simple name', t => {
  const actual = formatName('test')
  const expected = 'Test'

  t.is(actual, expected)
})

test('formats name with dashes', t => {
  const actual = formatName('hello-world')
  const expected = 'Hello World'

  t.is(actual, expected)
})

test('formats name with leading dash', t => {
  const actual = formatName('-hello-world')
  const expected = 'Hello World'

  t.is(actual, expected)
})

test('formats name with trailing dash', t => {
  const actual = formatName('hello-world-')
  const expected = 'Hello World'

  t.is(actual, expected)
})

test('formats name with double dashes', t => {
  const actual = formatName('hello--world')
  const expected = 'Hello World'

  t.is(actual, expected)
})
