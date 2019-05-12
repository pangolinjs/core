import fs from 'fs-extra'
import getConfig from '../../../../lib/utils/get-config'
import path from 'path'
import store from '../../../../lib/store'
import test from 'ava'

const stateBackup = Object.assign({}, store.state)
const tempPath = path.join(__dirname, '.temp')
const tempFile = `${tempPath}/pangolin.config.js`

test.serial.before('setup', t => {
  fs.ensureDirSync(tempPath)
})

test.serial.afterEach('cleanup', t => {
  Object.assign(store.state, stateBackup)

  delete process.env.PANGOLIN_BASE
  delete process.env.PANGOLIN_HOST
  delete process.env.PANGOLIN_PORT

  try {
    delete require.cache[tempFile]
  } catch (_) {}

  fs.removeSync(tempFile)
})

test.serial('returns config from store', t => {
  store.state.config = 'Hello World'

  const config = getConfig(tempPath)
  t.snapshot(config)
})

test.serial('loads default config', t => {
  const config = getConfig(tempPath)
  t.snapshot(config)
})

test.serial('loads config from file', t => {
  const file = `module.exports = {
    devServer: {
      host: '127.0.0.1',
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
  fs.writeFileSync(tempFile, file)

  const config = getConfig(tempPath)
  t.snapshot(config)
})

test.serial('loads environment variables', t => {
  process.env.PANGOLIN_HOST = '127.0.0.1'
  process.env.PANGOLIN_PORT = 1337
  process.env.PANGOLIN_BASE = '/base/'

  const config = getConfig(tempPath)
  t.snapshot(config)
})
