/* COPY
 * ========================================================================== */



const paths = require('./paths.js');



/**
 * Specify files that shall be copied to `dev`, 'prev' or `dist`.
 */

module.exports = [
  {
    folder: 'node_modules/svgxuse',
    files: 'svgxuse.min.js',
    dest: paths.js.base
  }
];
