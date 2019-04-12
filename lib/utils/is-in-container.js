const fs = require('fs-extra')

/**
 * Check whether Node runs in a container
 * @see {@link https://stackoverflow.com/a/20012536}
 * @see {@link https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/serve.js}
 * @returns {Boolean} Node runs in a container
 */
function checkInContainer () {
  if (fs.existsSync(`/proc/1/cgroup`)) {
    const content = fs.readFileSync(`/proc/1/cgroup`, 'utf-8')
    return /:\/(lxc|docker|kubepods)\//.test(content)
  }
}

module.exports = checkInContainer
