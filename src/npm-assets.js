/* NPM ASSETS
 * ========================================================================== */



const paths = require('../gulp/paths.js');



/**
 * Specify files from node modules that shall be copied to `dev` or `dist`.
 */

module.exports = [
  {
    glob: 'node_modules/svg4everybody/dist/svg4everybody.{js,min.js}',
    dest: paths.js.base
  }
];
