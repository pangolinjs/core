import { networkInterfaces } from 'os'

/**
 * Check if network interface address is usable.
 * @param {import('os').NetworkInterfaceInfo} address
 * @returns {boolean}
 */
function isUsableAddress (address) {
  if (address.internal) {
    return false
  }

  if (address.family === 'IPv4') {
    return true
  }

  if (address.family === 4) {
    return true
  }
}

/**
 * Get a list of all IPv4 IPs associated with the host
 * @returns {string[]} List of IPv4 IPs
 */
export default function () {
  return Object.values(networkInterfaces())
    .flat()
    .filter(isUsableAddress)
    .map(address => address.address)
}
