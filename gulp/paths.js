/* PATHS
 * ========================================================================== */

/* eslint-env node */



/**
 * Edit these path bits.
 */

const paths = {
  src:  'src',
  dev:  'dev',
  prev: 'prev',
  dist: 'dist',
  css:  'css',
  js:   'js',
  html: 'html',
  img:  'img'
};



/**
 * Composed paths that can be used in other modules.
 */

module.exports = {
  // Base paths
  src:  paths.src,
  dev:  paths.dev,
  prev: paths.prev,
  dist: paths.dist,

  // CSS
  css: {
    base: paths.css,
    src:  `${paths.src}/${paths.css}`,
    dev:  `${paths.dev}/${paths.css}`,
    prev: `${paths.prev}/${paths.css}`,
    dist: `${paths.dist}/${paths.css}`,
  },

  // JavaScript
  js: {
    base: paths.js,
    src:  `${paths.src}/${paths.js}`,
    dev:  `${paths.dev}/${paths.js}`,
    prev: `${paths.prev}/${paths.js}`,
    dist: `${paths.dist}/${paths.js}`,
  },

  // HTML
  html: {
    base: paths.html,
    src:  `${paths.src}/${paths.html}`,
    dev:  paths.dev,
    prev: paths.prev
  },

  // Images
  img: {
    base: paths.img,
    src:  `${paths.src}/${paths.img}`,
    dev:  `${paths.dev}/${paths.img}`,
    prev: `${paths.prev}/${paths.img}`,
    dist: `${paths.dist}/${paths.img}`,
  }
};
