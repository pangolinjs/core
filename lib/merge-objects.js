import isDataType from './is-data-type.js'

/**
 * Deep merge two objects
 * @param {Object} target Target object
 * @param {Object} source Source object
 * @returns {Object} Merged objects
 */
export default function mergeObjects (target, source) {
  // Work on a shallow copy of the target so the original one won't be altered.
  const targetCopy = { ...target }

  for (const [key, value] of Object.entries(source)) {
    if (isDataType(value, Object)) {
      // Merge any source object into the corresponding target object,
      // or create a new one in the target in the key isn't present.
      targetCopy[key] = mergeObjects(targetCopy[key] ?? {}, source[key])
    } else {
      targetCopy[key] = source[key]
    }
  }

  return targetCopy
}
