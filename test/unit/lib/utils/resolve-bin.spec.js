import resolveBin from '../../../../lib/utils/resolve-bin'
import test from 'ava'
import path from 'path'

test('resolves binary for module', t => {
  const actual = resolveBin('ava')
  const expected = path.resolve('node_modules/ava/cli.js')

  t.is(actual, expected)
})
