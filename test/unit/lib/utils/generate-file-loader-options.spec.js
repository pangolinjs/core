const test = require('ava')

const generateFileLoaderOptions = require('../../../../lib/utils/generate-file-loader-options')
const store = require('../../../../lib/store')

const nodeEnvBackup = process.env.NODE_ENV
const stateBackup = Object.assign({}, store.state)

test.afterEach('cleanup', t => {
  process.env.NODE_ENV = nodeEnvBackup
  Object.assign(store.state, stateBackup)
})

test.serial('generates options', t => {
  process.env.NODE_ENV = 'development'

  store.state.config = {
    project: { base: '/stuff/' }
  }

  const expected = generateFileLoaderOptions('test')
  t.snapshot(expected)
})

test.serial('generates production options', t => {
  process.env.NODE_ENV = 'production'

  store.state.config = {
    project: { base: '/stuff/' }
  }

  const expected = generateFileLoaderOptions('test')
  t.snapshot(expected)
})

test.serial('generate options with hash', t => {
  process.env.NODE_ENV = 'development'

  store.state.config = {
    fileNameHash: true,
    project: { base: '/stuff/' }
  }

  const expected = generateFileLoaderOptions('test')
  t.snapshot(expected)
})

test.serial('generate production options with hash', t => {
  process.env.NODE_ENV = 'production'

  store.state.config = {
    fileNameHash: true,
    project: { base: '/stuff/' }
  }

  const expected = generateFileLoaderOptions('test')
  t.snapshot(expected)
})
