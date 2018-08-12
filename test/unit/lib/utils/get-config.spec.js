import fs from 'fs-extra'
import getConfig from '../../../../lib/utils/get-config'
import path from 'path'
import store from '../../../../lib/store'
import test from 'ava'

const storeBackup = {}

test.before('setup', t => {
  Object.assign(storeBackup, store)
  fs.ensureDirSync(path.join(__dirname, '.temp'))
})

test.afterEach('cleanup', t => {
  Object.assign(store, storeBackup)
  delete require.cache[require.resolve('./.temp/pangolin.config.js')]
  delete process.env.PANGOLIN_PORT
  delete process.env.PANGOLIN_BASE
})

test.serial('returns config from store', t => {
  store.config = 'Hello World'

  const actual = getConfig()
  const expected = 'Hello World'

  t.is(actual, expected)
})

test.serial('loads config', t => {
  const file = `module.exports = {
    devServer: {
      port: 1337
    },
    project: {
      name: 'Hello',
      base: '/base/',
      branding: {
        colorTheme: '#c0ffee',
        colorTitle: '#639',
        favicon: 'favicon.ico'
      }
    }
  }`
  fs.writeFileSync(path.join(__dirname, '.temp/pangolin.config.js'), file)

  const actual = getConfig(path.join(__dirname, '.temp'))
  const expected = {
    devServer: {
      port: 1337
    },
    project: {
      name: 'Hello',
      base: '/base/',
      branding: {
        colorTheme: '#c0ffee',
        colorTitle: '#639',
        favicon: 'favicon.ico'
      }
    }
  }

  t.deepEqual(actual, expected)
})

test.serial('loads config with fallback values', t => {
  const file = 'module.exports = {}'
  fs.writeFileSync(path.join(__dirname, '.temp/pangolin.config.js'), file)

  const actual = getConfig(path.join(__dirname, '.temp'))
  const expected = {
    devServer: {
      port: 8080
    },
    project: {
      name: 'Pangolin',
      base: '/'
    }
  }

  t.deepEqual(actual, expected)
})

test.serial('loads environment variables', t => {
  const file = 'module.exports = {}'
  fs.writeFileSync(path.join(__dirname, '.temp/pangolin.config.js'), file)
  process.env.PANGOLIN_PORT = 1337
  process.env.PANGOLIN_BASE = '/base/'

  const actual = getConfig(path.join(__dirname, '.temp'))

  t.is(actual.devServer.port, 1337)
  t.is(actual.project.base, '/base/')
})
