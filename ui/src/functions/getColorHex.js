import getColorRGB from './getColorRGB.js'

/**
 * Convert RGB component to Hex component
 * @param {number} component RGB component
 * @returns {string} Hex representation with leading zero
 */
function componentToHex (component) {
  const hex = component.toString(16)

  if (hex.length === 1) {
    return `0${hex}`
  }

  return hex
}

/**
 * Convert CSS color into Hex
 * @param {string} color CSS color
 * @returns {string} Hex color
 */
export default function (color) {
  const [r, g, b] = getColorRGB(color)
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
