import test from 'ava'

import getConfig from '../../../lib/get-config.mjs'
import getDirname from '../../../lib/get-dirname.mjs'

test.serial('gets default config', async t => {
  const result = await getConfig({})
  t.snapshot(result)
})

test.serial('gets user config', async t => {
  const dirname = getDirname(import.meta.url)
  const result = await getConfig({ context: dirname + '/helpers' })
  t.snapshot(result)
})
