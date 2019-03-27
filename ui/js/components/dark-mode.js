const STORAGE_KEY = 'pangolinDarkMode'
const TOGGLE_CLASS = 'has-dark-mode'
const PRISM_LIGHT = 'https://unpkg.com/prismjs@1.16.0/themes/prism-tomorrow.css'
const PRISM_DARK = 'https://unpkg.com/prismjs@1.16.0/themes/prism.css'

/**
 * “The Dark Mode” brought to you by Batman™️
 */
class DarkMode {
  /**
   * Create new dark mode
   * @param {Object} options Options
   * @param {HTMLElement} options.input Checkbox to enable dark mode
   * @param {string} [options.toggleClass=has-dark-mode] Toggle class name
   */
  constructor (options) {
    this.input = options.input

    this.toggleClass = options.toggleClass || TOGGLE_CLASS
    this.enabled = localStorage.getItem(STORAGE_KEY) || false

    this.prismCSS = document.createElement('link')
    this.prismCSS.rel = 'stylesheet'
    document.head.appendChild(this.prismCSS)
  }

  /**
   * Set initial state and add event listeners
   */
  init () {
    if (this.enabled) {
      this.enable()
    } else {
      this.disable()
    }

    this.input.addEventListener('change', event => {
      if (event.target.checked) {
        this.enable()
      } else {
        this.disable()
      }
    })
  }

  /**
   * Enable dark mode
   */
  enable () {
    document.documentElement.classList.add(this.toggleClass)
    localStorage.setItem(STORAGE_KEY, true)
    this.prismCSS.href = PRISM_LIGHT
    this.input.checked = true
  }

  /**
   * Disable dark mode
   */
  disable () {
    document.documentElement.classList.remove(this.toggleClass)
    localStorage.removeItem(STORAGE_KEY)
    this.prismCSS.href = PRISM_DARK
    this.input.checked = false
  }
}

const input = document.querySelector('.js-dark-mode-input')

if (input) {
  const darkMode = new DarkMode({ input })
  darkMode.init()
}
