import test from 'ava'

import StaticExtension from '../../../../lib/nunjucks/static-extension'
import store from '../../../../lib/store'

const pangolinEnvBackup = process.env.PANGOLIN_ENV
const stateBackup = Object.assign({}, store.state)

test.afterEach('cleanup', t => {
  process.env.PANGOLIN_ENV = pangolinEnvBackup
  Object.assign(store.state, stateBackup)
})

test('sets correct tag', t => {
  const staticExtension = new StaticExtension()
  t.deepEqual(staticExtension.tags, ['static'])
})

test.serial('returns correct url for dev', t => {
  process.env.PANGOLIN_ENV = 'dev'

  const staticExtension = new StaticExtension()
  const url = 'hello/world'

  const actual = staticExtension.run(null, url)
  const expected = '/hello/world'

  t.is(actual, expected)
})

test.serial('returns correct url for build', t => {
  store.state.config = {
    project: { base: '/stuff/' }
  }

  const staticExtension = new StaticExtension()
  const url = 'hello/world'

  const actual = staticExtension.run(null, url)
  const expected = '/stuff/hello/world'

  t.is(actual, expected)
})
