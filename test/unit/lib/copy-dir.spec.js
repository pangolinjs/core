import fs from 'fs/promises'
import path from 'path'
import test from 'ava'

import copyDir from '../../../lib/copy-dir.js'
import getDirname from '../../../lib/get-dirname.js'

test('copies entire directory', async t => {
  const dirname = getDirname(import.meta.url)
  const source = path.join(dirname, 'helpers')
  const destination = path.join(dirname, '.helpers-temp')

  await fs.mkdir(destination)
  await copyDir(source, destination)
  const result = await fs.readdir(destination)
  t.snapshot(result)
  await fs.rm(destination, { recursive: true, force: true })
})
