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
    : store.state.config.project.base

  const crossorigin = store.state.config.crossorigin
    ? `crossorigin="${store.state.config.crossorigin}"`
    : ''

  if (store.state.modern) {
    /**
     * Safari 10.1 `nomodule` support
     * @author samthor
     * @see {@link https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc}
     */
    head.push(`<script>(function(){var a=document.createElement('script');if(!('noModule'in a)&&'onbeforeload'in a){var b=!1;document.addEventListener('beforeload',function(c){if(c.target===a)b=!0;else if(!c.target.hasAttribute('nomodule')||!b)return;c.preventDefault()},!0),a.type='module',a.src='.',document.head.appendChild(a),a.remove()}})();</script>`)
  }

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    if (store.state.modern) {
      head.push(`<script defer type="module" ${crossorigin} src="${base}js/runtime.modern.js"></script>`)
      head.push(`<script defer type="module" ${crossorigin} src="${base}js/vendors.modern.js"></script>`)
      head.push(`<script defer nomodule ${crossorigin} src="${base}js/runtime.js"></script>`)
      head.push(`<script defer nomodule ${crossorigin} src="${base}js/vendors.js"></script>`)
    } else {
      head.push(`<script defer src="${base}js/runtime.js"></script>`)
      head.push(`<script defer src="${base}js/vendors.js"></script>`)
    }
  }

  if (store.state.modern) {
    head.push(`<script defer type="module" ${crossorigin} src="${base}js/main.modern.js"></script>`)
    head.push(`<script defer nomodule ${crossorigin} src="${base}js/main.js"></script>`)
  } else {
    head.push(`<script defer ${crossorigin} src="${base}js/main.js"></script>`)
  }

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    head.push(`<link rel="stylesheet" href="${base}css/vendors.css">`)
    head.push(`<link rel="stylesheet" href="${base}css/main.css">`)
  }

  return head.join('\n')
}
