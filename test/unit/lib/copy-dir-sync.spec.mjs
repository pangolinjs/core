import fs from 'fs'
import path from 'path'
import test from 'ava'

import copyDirSync from '../../../lib/copy-dir-sync.mjs'
import getDirname from '../../../lib/get-dirname.mjs'

test('copies entire directory', t => {
  const dirname = getDirname(import.meta.url)
  const source = path.join(dirname, 'helpers')
  const destination = path.join(dirname, '.helpers-temp')

  fs.mkdirSync(destination)
  copyDirSync(source, destination)
  const result = fs.readdirSync(destination)
  t.snapshot(result)
  fs.rmdirSync(destination, { recursive: true })
})
