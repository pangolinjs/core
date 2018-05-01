import Fuse from 'fuse.js'

const searchForm = document.querySelector('.js-pangolin-sidebar-form')
const searchInput = document.querySelector('.js-pangolin-sidebar-search')
const searchReset = document.querySelector('.js-pangolin-sidebar-search-reset')

const componentsContainer = document.querySelector('.js-pangolin-sidebar-components')
const prototypesContainer = document.querySelector('.js-pangolin-sidebar-prototypes')

const pageData = JSON.parse(document.querySelector('.js-pangolin-sidebar-page-data').innerHTML)
const fuseOptions = {
  keys: ['name'],
  threshold: 0.4
}

const fuse = new Fuse(pageData, fuseOptions)

searchForm.addEventListener('submit', event => {
  event.preventDefault()
})

/**
 * Create sidebar item HTML
 * @param {Object} page Page object
 */
function createSidebarItem (page) {
  return `
    <li class="pangolin-sidebar__item">
      <a
        class="pangolin-sidebar__link ${page.active ? 'is-active' : ''}"
        href="${page.url}">
        ${page.name}
      </a>
    </li>`
}

/**
 * Inject sidebar item HTML into sidebar
 * @param {Array} list Page list
 */
function injectHTML (list) {
  componentsContainer.innerHTML = list
    .filter(item => item.type === 'component')
    .map(createSidebarItem)
    .join('') || '<li class="pangolin-sidebar__item pangolin-sidebar__item--empty">No components found</li>'

  prototypesContainer.innerHTML = list
    .filter(item => item.type === 'prototype')
    .map(createSidebarItem)
    .join('') || '<li class="pangolin-sidebar__item pangolin-sidebar__item--empty">No prototypes found</li>'
}

searchInput.addEventListener('input', event => {
  let result = fuse.search(event.target.value)

  if (event.target.value) {
    searchReset.classList.add('is-visible')
    injectHTML(result)
  } else {
    searchReset.classList.remove('is-visible')
    injectHTML(pageData)
  }
})

searchReset.addEventListener('click', () => {
  searchReset.classList.remove('is-visible')
  searchInput.value = ''
  searchInput.focus()
  injectHTML(pageData)
})
