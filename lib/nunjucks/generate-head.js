const store = require('../store')

/**
 * Create script tag
 * @param {Array|string} attrs Script tag attributes or script content
 * @returns {string} Generated script tag
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
 * @returns {string} Generated style link
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

  // Code splitting and CSS extraction only happens in production build.
  // The following scripts/styles are therefore only needed for the dev build.
  if (process.env.PANGOLIN_ENV === 'build:dev') {
    if (store.state.modern) {
      head.scripts.push(['type="module"', crossorigin, `src="${base}js/vendors.modern.js"`])
      head.scripts.push(['defer', 'nomodule', crossorigin, `src="${base}js/vendors.js"`])
    } else {
      head.scripts.push(['defer', `src="${base}js/vendors.js"`])
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
    head.scripts.unshift(`/* prettier-ignore */ !function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`)

    head.scripts.push(['type="module"', crossorigin, `src="${base}js/main.modern.js"`])
    head.scripts.push(['defer', 'nomodule', crossorigin, `src="${base}js/main.js"`])
  } else {
    head.scripts.push(['defer', `src="${base}js/main.js"`])
  }

  head.scripts = head.scripts.map(createScriptTag)
  head.styles = head.styles.map(createStyleLink)

  return `${head.scripts.join('\n')}\n${head.styles.join('\n')}`
}
