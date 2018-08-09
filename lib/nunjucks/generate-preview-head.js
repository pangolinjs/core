const store = require('../store')

/**
 * Generate preview head
 * @param {string} base Base path
 * @returns {string} Preview head
 */
module.exports = function () {
  const head = []

  const base = process.env.PANGOLIN_ENV === 'dev'
    ? '/'
    : store.config.project.base

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    head.push(`<link rel="stylesheet" href="${base}css/vendors.css">`)
    head.push(`<link rel="stylesheet" href="${base}css/main.css">`)
    head.push(`<script defer src="${base}js/vendors.js"></script>`)
  }

  head.push(`<script defer src="${base}js/main.js"></script>`)

  return head.join('\n')
}
