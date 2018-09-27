import fs from 'fs-extra'
import getConfig from '../../../../lib/utils/get-config'
import path from 'path'
import store from '../../../../lib/store'
import test from 'ava'

const stateBackup = Object.assign({}, store.state)
fs.ensureDirSync(path.join(__dirname, '.temp'))

test.afterEach('cleanup', t => {
  Object.assign(store.state, stateBackup)
  delete process.env.PANGOLIN_PORT
  delete process.env.PANGOLIN_BASE

  if (fs.existsSync(path.join(__dirname, '.temp/pangolin.config.js'))) {
    delete require.cache[require.resolve('./.temp/pangolin.config.js')]
  }
})

test.serial('returns config from store', t => {
  store.state.config = 'Hello World'

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
    fileNameHash: true,
    nunjucks: {},
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
    fileNameHash: true,
    nunjucks: {},
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
