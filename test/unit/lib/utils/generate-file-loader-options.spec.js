import generateFileLoaderOptions from '../../../../lib/utils/generate-file-loader-options'
import store from '../../../../lib/store'
import test from 'ava'

const nodeEnvBackup = process.env.NODE_ENV
const storeBackup = Object.assign({}, store)

test.afterEach('cleanup', t => {
  process.env.NODE_ENV = nodeEnvBackup
  Object.assign(store, storeBackup)
})

test.serial('generates options without hash', t => {
  store.config = { fileNameHash: false }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[ext]',
    publicPath: undefined
  }

  t.deepEqual(actual, expected)
})

test.serial('generates production options without hash', t => {
  process.env.NODE_ENV = 'production'
  store.config = { fileNameHash: false }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[ext]',
    publicPath: '..'
  }

  t.deepEqual(actual, expected)
})

test.serial('generate options with hash', t => {
  store.config = { fileNameHash: true }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[hash:8].[ext]',
    publicPath: undefined
  }

  t.deepEqual(actual, expected)
})

test.serial('generate production options with hash', t => {
  process.env.NODE_ENV = 'production'
  store.config = { fileNameHash: true }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[hash:8].[ext]',
    publicPath: '..'
  }

  t.deepEqual(actual, expected)
})
