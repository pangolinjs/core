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

  const path = to.path
    // Remove `/index.html` from path if it's present.
    .replace('/index.html', '')
    // Cut the first `/` off the path.
    .slice(1)

  // Remove trailing `index.html`.
  if (to.path.endsWith('index.html')) {
    next(path)
    return
  }

  // Get current page by path and save to store.
  store.commit('current', store.getters.componentByPath(path))

  next()
}
