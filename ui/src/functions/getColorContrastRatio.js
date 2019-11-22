/**
 * Color contrast ratio
 * @author kirilloid
 * @see {@link https://stackoverflow.com/a/9733420/9208523}
 */

/**
 * Get color luminance
 * @param {[number, number, number]} rgb RGB color array
 * @returns {number} Luminance
 */
function getLuminance (rgb) {
  const a = rgb.map(v => {
    v /= 255

    if (v <= 0.03928) {
      return v / 12.92
    }

    return Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Get contrast ratio for two RGB colors
 * @param {[number, number, number]} rgb1 First color RGB array
 * @param {[number, number, number]} rgb2 Second color RGB array
 * @returns {number} Color contrast ratio
 */
export default function (rgb1, rgb2) {
  const luminance1 = getLuminance(rgb1) + 0.05
  const luminance2 = getLuminance(rgb2) + 0.05

  return Math.max(luminance1, luminance2) / Math.min(luminance1, luminance2)
}
