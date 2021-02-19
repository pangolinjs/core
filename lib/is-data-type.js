/**
 * Determine data type in a reliable way
 *
 * Screw you `typeof`!
 * @param {any} data The data
 * @param {any} type The type
 * @returns {Boolean} Data is of type
 */
export default function (data, type) {
  return Object.prototype.toString.call(data).slice(8, -1) === type.name
}
