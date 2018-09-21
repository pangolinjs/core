import focusTrap from 'focus-trap'

/**
 * A Bar to the Side
 */
class Sidebar {
  /**
   * Create new sidebar
   * @param {Object} options Sidebar options
   * @param {HTMLElement} options.container Sidebar container element
   * @param {NodeList} options.buttons Sidebar toggle buttons
   */
  constructor (options) {
    this.container = options.container
    this.buttons = options.buttons
    this.id = options.container.id
    this.isExpanded = false
    this.focusTrap = focusTrap(options.container)
  }

  /**
   * Initialize sidebar
   */
  init () {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].setAttribute('aria-controls', this.id)
      this.buttons[i].addEventListener('click', () => this.toggle())
    }
  }

  /**
   * Open sidebar
   */
  open () {
    this.elementWithFocus = document.activeElement
    this.container.classList.add('is-expanded')

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].classList.add('is-active')
      this.buttons[i].setAttribute('aria-expanded', 'true')
    }

    this.isExpanded = true
    this.focusTrap.activate()
  }

  /**
   * Close sidebar
   */
  close () {
    this.container.classList.remove('is-expanded')

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].classList.remove('is-active')
      this.buttons[i].setAttribute('aria-expanded', 'false')
    }

    this.isExpanded = false
    this.focusTrap.deactivate()
  }

  /**
   * Toggle sidebar
   */
  toggle () {
    if (this.isExpanded) {
      this.close()
    } else {
      this.open()
    }
  }
}

const container = document.querySelector('.js-sidebar')
const buttons = document.querySelectorAll('.js-sidebar-button')

if (container && buttons.length) {
  const sidebar = new Sidebar({ container, buttons })
  sidebar.init()
}
