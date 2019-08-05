/** !
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 */

/**
 * Determine if color is light or dark
 * @param {String} hexcolor Hex color value (#000 or #000000)
 * @returns {String} The contrasting color (black or white)
 */
export default function (hexcolor) {
  // Remove leading '#'
  let color = hexcolor.slice(1)

  // If a three-character hexcode, make six-character
  if (color.length === 3) {
    color = color.split('').map(value => value + value).join('')
  }

  // Convert to RGB value
  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)

  // Get YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

  console.log(yiq)

  // Check contrast
  return yiq >= 128
}
