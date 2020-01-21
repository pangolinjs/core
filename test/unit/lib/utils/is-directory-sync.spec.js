const path = require('path')
const test = require('ava')

const isDirectorySync = require('../../../../lib/utils/is-directory-sync')

test('is directory', t => {
  const actual = isDirectorySync(__dirname)

  t.true(actual)
})

test('is not directory', t => {
  const actual = isDirectorySync(path.join(__dirname, 'is-directory-sync.spec.js'))

  t.false(actual)
})
