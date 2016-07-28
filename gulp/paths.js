/* PATHS
 * ========================================================================== */



/**
 * Edit these path bits.
 */

const paths = {
  src:  'src',
  dev:  'dev',
  dist: 'dist',
  css:  'css',
  js:   'js',
  html: 'html',
  img:  'img'
}



/**
 * Composed paths that can be used in other modules.
 */

module.exports = {
  // Base paths
  src:  paths.src,
  dev:  paths.dev,
  dist: paths.dist,

  // CSS
  css: {
    base: paths.css,
    src:  `${paths.src}/${paths.css}`,
    dev:  `${paths.dev}/${paths.css}`,
    dist: `${paths.dist}/${paths.css}`,
  },

  // JavaScript
  js: {
    base: paths.js,
    src:  `${paths.src}/${paths.js}`,
    dev:  `${paths.dev}/${paths.js}`,
    dist: `${paths.dist}/${paths.js}`,
  },

  // HTML
  html: {
    base: paths.html,
    src:  `${paths.src}/${paths.html}`,
    dev:  paths.dev,
    dist: paths.dist
  },

  // Images
  img: {
    base: paths.img,
    src:  `${paths.src}/${paths.img}`,
    dev:  `${paths.dev}/${paths.img}`,
    dist: `${paths.dist}/${paths.img}`,
  }
};
