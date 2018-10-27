const nav = document.querySelector('.js-nav')
const storageKey = 'pangolinNavScrollPosition'

window.addEventListener('DOMContentLoaded', () => {
  nav.scrollTop = localStorage.getItem(storageKey)
})

window.addEventListener('beforeunload', () => {
  localStorage.setItem(storageKey, nav.scrollTop)
})
