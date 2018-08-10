import formatName from '../../../../lib/utils/format-name'
import test from 'ava'

test('formats simple name', t => {
  const actual = formatName('test')
  const expected = 'Test'

  t.is(actual, expected)
})

test('formats name with dashes', t => {
  const actual = formatName('hello--world')
  const expected = 'Hello World'

  t.is(actual, expected)
})

test('throws on empty ‘name’ parameter', t => {
  const actual = t.throws(() => { formatName() }).message
  const expected = 'Paramater ‘name’ is necessary.'

  t.is(actual, expected)
})

test('throws on non-string ‘path’ parameter', t => {
  const actualArray = t.throws(() => { formatName([]) }).message
  const actualFunction = t.throws(() => { formatName(() => {}) }).message
  const actualNumber = t.throws(() => { formatName(2) }).message
  const actualObject = t.throws(() => { formatName({}) }).message
  const expected = 'Parameter ‘name’ must be a string.'

  t.is(actualArray, expected)
  t.is(actualFunction, expected)
  t.is(actualNumber, expected)
  t.is(actualObject, expected)
})
