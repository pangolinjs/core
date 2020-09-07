/**
 * Generate asset links
 * @param {Object} options Options
 * @param {string[]} options.files All emitted assets
 * @returns {{js:string[], css:string[]}} Asset links
 */
export default function ({ files }) {
  const js = files.filter(file => file.endsWith('.js'))
  const css = files.filter(file => file.endsWith('.css'))

  return { js, css }
}
