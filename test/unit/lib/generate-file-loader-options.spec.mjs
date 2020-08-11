import test from 'ava'

import generateFileLoaderOptions from '../../../lib/generate-file-loader-options.mjs'

test('generates options', t => {
  const result = generateFileLoaderOptions({ type: 'js' })
  t.snapshot(result)
})
