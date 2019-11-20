import store from '../store'

const TITLE_TEMPLATE = document.title
const title = document.querySelector('title')

/**
 * Vue Router afterEach hook
 * @type {import("vue-router").NavigationGuard}
 */
export default function () {
  const currentName = store.state.current.name

  title.innerText = currentName
    ? `${currentName} | ${TITLE_TEMPLATE}`
    : TITLE_TEMPLATE

  // Only the render <iframe> will be reloaded. Old logs still “spam” the
  // console so we have to get rid of them.
  console.clear()
}
