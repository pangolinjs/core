import { dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * Extract dirname from esm meta URL
 * @param {string} importMetaURL import.meta.url
 * @returns {string} Dirname
 */
export default function (importMetaURL) {
  return dirname(fileURLToPath(importMetaURL))
}
