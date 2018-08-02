const store = require('../utils/store')

/**
 * Generate preview head
 * @param {string} base Base path
 * @returns {string} Preview head
 */
module.exports = function () {
  const head = []

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    head.push(`<link rel="stylesheet" href="${store.config.project.base}css/vendors.css">`)
    head.push(`<link rel="stylesheet" href="${store.config.project.base}css/main.css">`)
    head.push(`<script defer src="${store.config.project.base}js/vendors.js"></script>`)
  }

  head.push(`<script defer src="${store.config.project.base}js/main.js"></script>`)

  return head.join('\n')
}
