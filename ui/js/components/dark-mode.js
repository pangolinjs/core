import cookies from 'js-cookie'

/**
 * “The dark mode” brought to you by Batman™️
 */
export default class DarkMode {
  /**
   * Create new dark mode
   * @param {Object} options Options
   * @param {HTMLElement} options.enableInput Radio input to enable dark mode
   * @param {HTMLElement} options.disableInput Radio input to disable dark mode
   * @param {string} [options.toggleClass=has-dark-mode] Toggle class name
   */
  constructor (options) {
    this.enableInput = options.enableInput
    this.disableInput = options.disableInput
    this.toggleClass = options.toggleClass || 'has-dark-mode'
    this.enabled = cookies.getJSON('dark-mode-enabled') || false
    this.prismCSS = document.createElement('link')
  }

  /**
   * Set initial state and add event listeners
   */
  init () {
    this.prismCSS.rel = 'stylesheet'
    document.head.appendChild(this.prismCSS)

    if (this.enabled) {
      this.enable()
    } else {
      this.disable()
    }

    this.enableInput.addEventListener('change', event => {
      if (event.target.checked) {
        this.enable()
      }
    })

    this.disableInput.addEventListener('change', event => {
      if (event.target.checked) {
        this.disable()
      }
    })
  }

  /**
   * Enable dark mode
   */
  enable () {
    document.documentElement.classList.add(this.toggleClass)
    cookies.set('dark-mode-enabled', true)
    this.prismCSS.href = 'https://unpkg.com/prismjs@1.15.0/themes/prism-tomorrow.css'
    this.enableInput.checked = true
  }

  /**
   * Disable dark mode
   */
  disable () {
    document.documentElement.classList.remove(this.toggleClass)
    cookies.remove('dark-mode-enabled')
    this.prismCSS.href = 'https://unpkg.com/prismjs@1.15.0/themes/prism.css'
    this.disableInput.checked = true
  }
}
