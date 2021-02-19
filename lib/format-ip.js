/**
 * Format IP
 *
 * Convert `0.0.0.0` and `::` to localhost.
 * @param {string} ip IP address
 * @returns {string} Formatted IP
 */
export default function (ip) {
  if (ip === '0.0.0.0' || ip === '::') {
    return 'localhost'
  }

  return ip
}
