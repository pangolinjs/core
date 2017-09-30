const sidebar = document.querySelector('.js-fesg-sidebar')
const button = document.querySelector('.js-fesg-sidebar-toggle')
const content = document.querySelector('.js-fesg-content')
const breakpoint = window.matchMedia('(min-width: 62.5rem)')

/**
 * Open sidebar
 */
function openSidebar () {
  sidebar.classList.add('is-open')
  button.classList.add('is-active')

  sidebar.setAttribute('aria-hidden', 'false')
  button.setAttribute('aria-label', 'Close Front End Styleguide sidebar')

  if (content) {
    content.classList.remove('is-expanded')
  }
}

/**
 * Close sidebar
 */
function closeSidebar () {
  sidebar.classList.remove('is-open')
  button.classList.remove('is-active')

  sidebar.setAttribute('aria-hidden', 'true')
  button.setAttribute('aria-label', 'Open Front End Styleguide sidebar')

  if (content) {
    content.classList.add('is-expanded')
  }
}

/**
 * Toggle sidebar state
 */
function toggleSidebar () {
  if (sidebar.classList.contains('is-open')) {
    closeSidebar()
  } else {
    openSidebar()
  }
}

// Set initial sidebar state based on viewport width
// and presence of the component content
if (breakpoint.matches && content) {
  openSidebar()
}

// Wait a bit to avoid animating on page load
setTimeout(() => {
  sidebar.classList.add('is-animated')
  button.classList.add('is-animated')

  if (content) {
    content.classList.add('is-animated')
  }
}, 200)

// Toggle sidebar on viewport resize
breakpoint.addListener((mql) => {
  if (mql.matches && content) {
    openSidebar()
  } else {
    closeSidebar()
  }
})

// Toggle sidebar on button click
button.addEventListener('click', toggleSidebar)
