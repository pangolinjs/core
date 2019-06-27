import generateFileLoaderOptions from '../../../../lib/utils/generate-file-loader-options'
import store from '../../../../lib/store'
import test from 'ava'

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

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[ext]'
  }

  t.deepEqual(actual, expected)
})

test.serial('generates production options', t => {
  process.env.NODE_ENV = 'production'

  store.state.config = {
    project: { base: '/stuff/' }
  }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[ext]',
    publicPath: '/stuff/'
  }

  t.deepEqual(actual, expected)
})

test.serial('generate options with hash', t => {
  process.env.NODE_ENV = 'development'

  store.state.config = {
    fileNameHash: true,
    project: { base: '/stuff/' }
  }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[hash:8].[ext]'
  }

  t.deepEqual(actual, expected)
})

test.serial('generate production options with hash', t => {
  process.env.NODE_ENV = 'production'

  store.state.config = {
    fileNameHash: true,
    project: { base: '/stuff/' }
  }

  const actual = generateFileLoaderOptions('test')
  const expected = {
    name: 'assets/test/[name].[hash:8].[ext]',
    publicPath: '/stuff/'
  }

  t.deepEqual(actual, expected)
})
