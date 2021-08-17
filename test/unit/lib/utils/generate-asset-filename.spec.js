const test = require('ava')

const generateAssetFilename = require('../../../../lib/utils/generate-asset-filename')
const store = require('../../../../lib/store')

const stateBackup = Object.assign({}, store.state)

test.afterEach('cleanup', t => {
  Object.assign(store.state, stateBackup)
})

test.serial('generates options', t => {
  store.state.config = {
    project: { base: '/stuff/' }
  }

  const expected = generateAssetFilename('test')
  t.snapshot(expected)
})

test.serial('generate options with hash', t => {
  store.state.config = {
    fileNameHash: true,
    project: { base: '/stuff/' }
  }

  const expected = generateAssetFilename('test')
  t.snapshot(expected)
})
