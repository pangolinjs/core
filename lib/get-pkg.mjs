import path from 'path'
import fs from 'fs'

/**
 * Get package.json
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @returns {Object} package.json
 */
export default function ({ context }) {
  try {
    const file = fs.readFileSync(path.join(context, 'package.json'))
    return JSON.parse(file)
  } catch {
    return {}
  }
}
