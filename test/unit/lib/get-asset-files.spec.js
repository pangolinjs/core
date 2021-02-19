import test from 'ava'

import getAssetFiles from '../../../lib/get-asset-files.js'

test('gets asset files', t => {
  const result = getAssetFiles({
    files: ['hello.js', 'world.css', 'universe.svg']
  })

  t.snapshot(result)
})
