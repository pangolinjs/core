import { truncate } from 'lodash-es'

/**
 * Truncate text to 100 characters
 * @param {string} text Text to truncate
 * @returns {string} Truncated text
 */
export default function (text) {
  return truncate(text, {
    length: 100,
    omission: '…'
  })
}
