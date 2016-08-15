/* NPM ASSETS
 * ========================================================================== */

const paths = require('../gulp/paths.js');


/**
 * Specify files from node modules that shall be copied to `dev`, 'prev' or `dist`.
 */

module.exports = [
  {
    glob: 'node_modules/svgxuse/svgxuse.{js,min.js}',
    dest: paths.js.base
  }
];
