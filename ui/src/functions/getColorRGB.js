/**
 * Get red, green, and blue color components
 * @param {string} color CSS color (hex, rgb, or hsl)
 * @returns {[number, number, number]} Red, green, and blue values
 */
export default function (color) {
  const div = document.createElement('div')
  div.style.color = color
  document.body.append(div)

  const rgb = getComputedStyle(div).color
    .slice(4, -1)
    .replace(/ /g, '')
    .split(',')
    .map(fragment => parseInt(fragment))

  document.body.removeChild(div)

  return rgb
}
