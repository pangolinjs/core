import test from 'ava'

import generateAssetFilename from '../../../lib/generate-asset-filename.js'

test('generates options', t => {
  const result = generateAssetFilename({ type: 'img' })
  t.snapshot(result)
})

test('generates options with hash', t => {
  const result = generateAssetFilename({ type: 'img', hash: true })
  t.snapshot(result)
})
