import fs from 'fs/promises'
import path from 'path'

/**
 * Get package.json
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @returns {Promise<Object>} package.json
 */
export default async function ({ context }) {
  try {
    const file = await fs.readFile(path.join(context, 'package.json'))
    return JSON.parse(file)
  } catch {
    return {}
  }
}
