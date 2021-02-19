import test from 'ava'

import isDataType from '../../../lib/is-data-type.js'

test('detects objects', t => {
  const result = isDataType({}, Object)
  t.true(result)
})

test('detects arrays', t => {
  const result = isDataType([], Array)
  t.true(result)
})

test('detects dates', t => {
  const result = isDataType(new Date(), Date)
  t.true(result)
})

test('detects functions', t => {
  const result = isDataType(() => {}, Function)
  t.true(result)
})

test('detects strings', t => {
  const result = isDataType('', String)
  t.true(result)
})

test('detects numbers', t => {
  const result = isDataType(0, Number)
  t.true(result)
})

test('detects booleans', t => {
  const result = isDataType(true, Boolean)
  t.true(result)
})

test('detects symbols', t => {
  const result = isDataType(Symbol(''), Symbol)
  t.true(result)
})
