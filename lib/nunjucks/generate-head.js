const store = require('../store')

/**
 * Create script tag
 * @param {Array|String} attrs Script tag attributes or script content
 * @returns {String} Generated script tag
 */
function createScriptTag (attrs) {
  if (typeof attrs === 'string') {
    return `<script>${attrs}</script>`
  }

  return `<script ${attrs.filter(Boolean).join(' ')}></script>`
}

/**
 * Create style link
 * @param {Array} attrs Style link attributes
 * @returns {String} Generated style link
 */
function createStyleLink (attrs) {
  return `<link rel="stylesheet" ${attrs.filter(Boolean).join(' ')}>`
}

/**
 * Generate preview head
 * @param {string} base Base path
 * @returns {string} Preview head
 */
module.exports = function () {
  const head = {
    scripts: [],
    styles: []
  }

  const base = process.env.PANGOLIN_ENV === 'dev'
    ? '/'
    : store.state.config.project.base

  const crossorigin = store.state.config.crossorigin
    ? `crossorigin="${store.state.config.crossorigin}"`
    : undefined

  if (process.env.PANGOLIN_ENV === 'build:dev') {
    if (store.state.modern) {
      head.scripts.push([`type="module"`, crossorigin, `src="${base}js/runtime.modern.js"`])
      head.scripts.push([`type="module"`, crossorigin, `src="${base}js/vendors.modern.js"`])
      head.scripts.push([`defer`, `nomodule`, crossorigin, `src="${base}js/runtime.js"`])
      head.scripts.push([`defer`, `nomodule`, crossorigin, `src="${base}js/vendors.js"`])
    } else {
      head.scripts.push([`defer`, `src="${base}js/runtime.js"`])
      head.scripts.push([`defer`, `src="${base}js/vendors.js"`])
    }

    head.styles.push([`href="${base}css/vendors.css"`])
    head.styles.push([`href="${base}css/main.css"`])
  }

  if (store.state.modern) {
    /**
     * Safari 10.1 `nomodule` support
     * This has to go before every other script
     * @author samthor
     * @see {@link https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc}
     */
    head.scripts.unshift(`(function(){var a=document.createElement('script');if(!('noModule'in a)&&'onbeforeload'in a){var b=!1;document.addEventListener('beforeload',function(c){if(c.target===a)b=!0;else if(!c.target.hasAttribute('nomodule')||!b)return;c.preventDefault()},!0),a.type='module',a.src='.',document.head.appendChild(a),a.remove()}})();`)

    head.scripts.push([`type="module"`, crossorigin, `src="${base}js/main.modern.js"`])
    head.scripts.push([`defer`, `nomodule`, crossorigin, `src="${base}js/main.js"`])
  } else {
    head.scripts.push([`defer`, `src="${base}js/main.js"`])
  }

  head.scripts = head.scripts.map(createScriptTag)
  head.styles = head.styles.map(createStyleLink)

  return `${head.scripts.join('\n')}\n${head.styles.join('\n')}`
}
