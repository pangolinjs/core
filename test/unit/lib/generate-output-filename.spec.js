import test from 'ava'

import generateOutputFilename from '../../../lib/generate-output-filename.js'

test('generates output filename', t => {
  const result = generateOutputFilename({ type: 'js' })
  t.is(result, 'js/[name].js')
})

test('generates output filename with hash', t => {
  const result = generateOutputFilename({ type: 'js', hash: 'all' })
  t.is(result, 'js/[contenthash:8].js')
})
