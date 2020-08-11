import { networkInterfaces } from 'os'

/**
 * Get a list of all IPv4 IPs associated with the host
 * @returns {string[]} List of IPv4 IPs
 */
export default function () {
  return Object.values(networkInterfaces())
    .flat()
    .filter(address => !address.internal && address.family === 'IPv4')
    .map(address => address.address)
}
