/* globals pangolinBase */

import api from '../api'
import store from '../store'

let isFirstLoad = true

export default async function (to, from, next) {
  // Get project and components information on first load.
  if (isFirstLoad) {
    const project = await api.get('project.json').json()
    store.commit('project', project)

    const components = await api.get('components.json').json()
    store.commit('components', components)

    isFirstLoad = false
  }

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

  // Remove base to get "pure" component path.
  const path = to.path.replace(pangolinBase, '')

  // Get current page by path and save to store.
  store.commit('current', store.getters.componentByPath(path))

  next()
}
