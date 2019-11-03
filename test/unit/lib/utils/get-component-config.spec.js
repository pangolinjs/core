import test from 'ava'
import path from 'path'

import getComponentConfig from '../../../../lib/utils/get-component-config'

test('returns default config', t => {
  const actual = getComponentConfig('./.temp/not-there.json')
  const expected = {
    template: 'default.njk'
  }

  t.deepEqual(actual, expected)
})

test('returns user config', t => {
  const configPath = path.join(__dirname, 'fixtures', 'component-config.json')

  const actual = getComponentConfig(configPath)
  const expected = {
    template: 'custom.njk',
    hidden: true
  }

  t.deepEqual(actual, expected)
})
