import test from 'ava'

import generateOutputFilename from '../../../lib/generate-output-filename.mjs'

test('generates output filename', t => {
  const result = generateOutputFilename({ type: 'js' })
  t.is(result, 'js/[name].js')
})
