import store from '../store'

/**
 * Vue Router beforeEach hook
 * @type {import("vue-router").NavigationGuard}
 */
export default async function (to, from, next) {
  // Remove trailing `/`.
  if (to.path.endsWith('/') && to.path !== '/') {
    return next(to.path.slice(0, -1))
  }

  // Remove trailing `index.html`.
  if (to.path.endsWith('/index.html')) {
    return next(to.path.replace('/index.html', ''))
  }

  // Remove leading `/` to get "pure" path.
  const path = to.path.slice(1)

  if (to.name === 'component') {
    // Get current page by path and save to store.
    store.commit('current', store.getters.componentByPath(path))
  }

  if (to.name === 'template') {
    store.commit('current', store.getters.templateByPath(path))
  }

  next()
}
