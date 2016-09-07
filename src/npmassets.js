/* NPM ASSETS
 * ========================================================================== */

const paths = require('../gulp/paths.js');


/**
 * Specify files from node modules that shall be copied to `dev`, 'prev' or `dist`.
 */

module.exports = [
  {
    module: 'svgxuse',
    files: 'svgxuse.min.js',
    dest: paths.js.base
  }
];
