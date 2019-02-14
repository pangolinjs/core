const nav = document.querySelector('.js-nav')
const STORAGE_KEY = 'pangolinNavScrollPosition'

window.addEventListener('load', () => {
  nav.scrollTop = localStorage.getItem(STORAGE_KEY)
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem(STORAGE_KEY, nav.scrollTop)
})
