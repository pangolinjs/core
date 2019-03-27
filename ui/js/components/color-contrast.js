const DARK_CLASS = 'has-dark-background'

/**
 * Color is dark
 * @param {Number} r Red
 * @param {Number} g Green
 * @param {Number} b Blue
 * @returns {Boolean} Is dark
 */
function isDark (r, g, b) {
  /**
   * W3C perceived brightness calculator
   * @see {@link https://www.w3.org/TR/AERT/#color-contrast}
   */
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000

  if (brightness < 140) {
    return true
  }

  return false
}

const elements = document.querySelectorAll('.js-color-contrast')

window.addEventListener('load', () => {
  [...elements].forEach(element => {
    const [r, g, b] = getComputedStyle(element).backgroundColor.match(/\d{1,3}/g)

    if (isDark(r, g, b)) {
      element.classList.add(DARK_CLASS)
    }
  })
})
