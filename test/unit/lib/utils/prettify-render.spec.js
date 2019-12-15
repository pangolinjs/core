import fs from 'fs'
import path from 'path'
import test from 'ava'

import prettifyRender from '../../../../lib/utils/prettify-render'

test('prettifies rendered HTML', t => {
  const inputPath = path.join(__dirname, 'fixtures', 'prettify-render.html')
  const input = fs.readFileSync(inputPath).toString()
  const output = prettifyRender(input)

  t.snapshot(output)
})
