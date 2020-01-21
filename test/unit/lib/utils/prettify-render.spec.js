const fs = require('fs')
const path = require('path')
const test = require('ava')

const prettifyRender = require('../../../../lib/utils/prettify-render')

test('prettifies rendered HTML', t => {
  const inputPath = path.join(__dirname, 'fixtures', 'prettify-render.html')
  const input = fs.readFileSync(inputPath).toString()
  const output = prettifyRender(input)

  t.snapshot(output)
})
