import fs from 'fs-extra'
import path from 'path'
import readFileSync from '../../../../lib/utils/read-file-sync'
import test from 'ava'

test.before('setup', t => {
  fs.ensureDirSync(path.join(__dirname, '.temp'))
})

test('reads file and returns content as string', t => {
  fs.writeFileSync(path.join(__dirname, '.temp/string.txt'), 'Hello World')

  const actual = readFileSync(path.join(__dirname, '.temp/string.txt'))
  const expected = 'Hello World'

  t.is(actual, expected)
})

test('returns undefined for missing files', t => {
  const actual = readFileSync('missing-file.404')
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
