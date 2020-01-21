const fs = require('fs')
const path = require('path')
const test = require('ava')

const highlightSource = require('../../../../lib/utils/highlight-source')

test('highlights Nunjucks code', t => {
  const inputPath = path.join(__dirname, 'fixtures', 'highlight-source.njk')
  const input = fs.readFileSync(inputPath).toString()
  const output = highlightSource(input)

  t.snapshot(output)
})
