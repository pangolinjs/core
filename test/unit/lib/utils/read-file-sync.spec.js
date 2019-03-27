import fs from 'fs-extra'
import path from 'path'
import readFileSync from '../../../../lib/utils/read-file-sync'
import test from 'ava'

fs.ensureDirSync(path.join(__dirname, '.temp'))

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
