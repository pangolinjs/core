import test from 'ava'

import store from '../../../../lib/store.js'

const generateHTML = '../../../../lib/utils/generate-html.js'
const pangolinEnvBackup = process.env.PANGOLIN_ENV
const stateBackup = { ...store.state }

test.afterEach.always('cleanup', () => {
  delete require.cache[require.resolve(generateHTML)]
  process.env.PANGOLIN_ENV = pangolinEnvBackup
  store.state = stateBackup
})

const state = {
  project: {
    name: 'Hello World',
    base: '/base/',
    branding: {
      favicon: 'favicon.ico'
    }
  },
  devServer: {
    webSocketPath: '/socket'
  }
}

test.serial('generates prod HTML', t => {
  store.state.config = state

  const expected = require(generateHTML)()
  t.snapshot(expected)
})

test.serial('generates dev HTML', t => {
  process.env.PANGOLIN_ENV = 'dev'
  store.state.config = state

  const expected = require(generateHTML)()
  t.snapshot(expected)
})
