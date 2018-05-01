const sidebar = document.querySelector('.js-pangolin-sidebar')
const button = document.querySelector('.js-pangolin-sidebar-toggle')
const content = document.querySelector('.js-pangolin-content')
const breakpoint = window.matchMedia('(min-width: 70rem)')

/**
 * Open sidebar
 */
function openSidebar () {
  sidebar.classList.add('is-open')
  button.classList.add('is-active')

  sidebar.setAttribute('aria-hidden', 'false')
  button.setAttribute('aria-label', 'Close Pangolin sidebar')

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
  button.setAttribute('aria-label', 'Open Pangolin sidebar')

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
window.setTimeout(() => {
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
