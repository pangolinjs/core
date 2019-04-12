/**
 * Check if host is unspecified
 * @see {@link https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/util/prepareURLs.js}
 * @param {String} host Hostname
 * @returns {Boolean} Host is unspecified
 */
function isUnspecifiedHost (host) {
  return host === '0.0.0.0' || host === '::'
}

module.exports = isUnspecifiedHost
