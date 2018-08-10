import normalizePath from '../../../../lib/utils/normalize-path'
import test from 'ava'

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

test('throws on empty ‘path’ parameter', t => {
  const actual = t.throws(() => { normalizePath() }).message
  const expected = 'Paramater ‘path’ is necessary.'

  t.is(actual, expected)
})

test('throws on non-string ‘path’ parameter', t => {
  const actualArray = t.throws(() => { normalizePath([]) }).message
  const actualFunction = t.throws(() => { normalizePath(() => {}) }).message
  const actualNumber = t.throws(() => { normalizePath(2) }).message
  const actualObject = t.throws(() => { normalizePath({}) }).message
  const expected = 'Parameter ‘path’ must be a string.'

  t.is(actualArray, expected)
  t.is(actualFunction, expected)
  t.is(actualNumber, expected)
  t.is(actualObject, expected)
})
