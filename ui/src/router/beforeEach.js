import store from '../store.js'

/**
 * Vue Router beforeEach hook
 * @type {import("vue-router").NavigationGuard}
 */
export default async function (to, from, next) {
  const { name, path, query } = to

  // Remove trailing `/`.
  if (path.endsWith('/') && path !== '/') {
    return next({ path: path.slice(0, -1), query })
  }

  // Remove trailing `/index.html`.
  if (path.endsWith('/index.html')) {
    return next({ path: path.slice(0, -11), query })
  }

  // Remove leading `/` to get "pure" component path.
  const componentPath = path.slice(1)

  if (name === 'component') {
    store.commit('current', store.getters.componentByPath(componentPath))
  }

  if (name === 'template') {
    store.commit('current', store.getters.templateByPath(componentPath))
  }

  next()
}
