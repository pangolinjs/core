const path = require('path')
const test = require('ava')

const getTemplates = require('../../../../lib/utils/get-templates')

test('loads templates', t => {
  const context = path.join(__dirname, 'fixtures')
  const templates = getTemplates(context)

  t.snapshot(templates)
})
