import isDirectorySync from '../../../../lib/utils/is-directory-sync'
import test from 'ava'
import path from 'path'

test('is directory', t => {
  const actual = isDirectorySync(__dirname)

  t.true(actual)
})

test('is not directory', t => {
  const actual = isDirectorySync(path.join(__dirname, 'is-directory-sync.spec.js'))

  t.false(actual)
})
