import store from '../store'

export default async function (to, from, next) {
  // Remove trailing `/`.
  if (to.path.endsWith('/') && to.path !== '/') {
    next(to.path.slice(0, -1))
    return
  }

  // Remove trailing `index.html`.
  if (to.path.endsWith('/index.html')) {
    next(to.path.replace('/index.html', ''))
    return
  }

  // Remove leading `/` to get "pure" component path.
  const path = to.path.slice(1)

  // Get current page by path and save to store.
  store.commit('current', store.getters.componentByPath(path))

  next()
}
