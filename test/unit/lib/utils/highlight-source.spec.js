import fs from 'fs'
import path from 'path'
import test from 'ava'

import highlightSource from '../../../../lib/utils/highlight-source'

test('highlights Nunjucks code', t => {
  const inputPath = path.join(__dirname, 'fixtures', 'highlight-source.njk')
  const input = fs.readFileSync(inputPath).toString()
  const output = highlightSource(input)

  t.snapshot(output)
})
