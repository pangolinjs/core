import generatePreviewHead from '../../../../lib/nunjucks/generate-preview-head'
import store from '../../../../lib/store'
import test from 'ava'

const storeBackup = Object.assign({}, store)

test.afterEach('cleanup', t => {
  delete process.env.PANGOLIN_ENV
  Object.assign(store, storeBackup)
})

test.serial('generates dev template', t => {
  process.env.PANGOLIN_ENV = 'dev'
  const template = generatePreviewHead()

  t.snapshot(template)
})

test.serial('generates build template', t => {
  store.config = { project: { base: '/test/' } }
  process.env.PANGOLIN_ENV = 'build'
  const template = generatePreviewHead()

  t.snapshot(template)
})

test.serial('generates build:dev template', t => {
  store.config = { project: { base: '/test/' } }
  process.env.PANGOLIN_ENV = 'build:dev'
  const template = generatePreviewHead()

  t.snapshot(template)
})
