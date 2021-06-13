import test from 'ava'

import PangolinHeadExtension from '../../../lib/pangolin-head-extension.js'

test.serial('creates <head> markup in dev mode', t => {
  const nodeEnvCopy = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  const publicPath = '/hello/world/'
  const assets = { js: [], css: [] }

  const result = new PangolinHeadExtension({ publicPath, assets })
  t.snapshot(result.run().val)

  process.env.NODE_ENV = nodeEnvCopy
})

test.serial('creates <head> markup in prod mode', t => {
  const publicPath = '/hello/world/'
  const assets = {
    js: ['vendor.js', 'app.js'],
    css: ['vendor.css', 'app.css']
  }

  const result = new PangolinHeadExtension({ publicPath, assets })

  t.deepEqual(result.tags, ['pangolin_head'])
  t.snapshot(result.run().val)
})
