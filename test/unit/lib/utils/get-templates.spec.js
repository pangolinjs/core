import path from 'path'
import test from 'ava'

import getTemplates from '../../../../lib/utils/get-templates'

test('loads templates', t => {
  const context = path.join(__dirname, 'fixtures')
  const templates = getTemplates(context)

  t.snapshot(templates)
})
