import path from 'path'
import readFileSync from '../../../../lib/utils/read-file-sync'
import test from 'ava'

test('reads file and returns content as string', t => {
  const actual = readFileSync(path.join(__dirname, 'fixtures/string.txt'))
  const expected = 'Hello World\n'

  t.is(actual, expected)
})

test('returns undefined for missing files', t => {
  const actual = readFileSync(path.join(__dirname, 'fixtures/missing-file.404'))
  const expected = undefined

  t.is(actual, expected)
})

test('throws on empty ‘filePath’ parameter', t => {
  const actual = t.throws(() => { readFileSync() }).message
  const expected = 'Paramater ‘filePath’ is necessary.'

  t.is(actual, expected)
})

test('throws on non-string ‘filePath’ parameter', t => {
  const actualArray = t.throws(() => { readFileSync([]) }).message
  const actualFunction = t.throws(() => { readFileSync(() => {}) }).message
  const actualNumber = t.throws(() => { readFileSync(2) }).message
  const actualObject = t.throws(() => { readFileSync({}) }).message
  const expected = 'Parameter ‘filePath’ must be a string.'

  t.is(actualArray, expected)
  t.is(actualFunction, expected)
  t.is(actualNumber, expected)
  t.is(actualObject, expected)
})
