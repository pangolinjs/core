/* SIMPLE COPY
 * ========================================================================== */



// Make paths variable available
// =========================================================

const paths = require('../config/paths.json');



// Specify files to copy
// =========================================================

module.exports = [
  {
    folder: 'node_modules/svgxuse',
    files: 'svgxuse.min.js',
    dest: paths.js.base,
    exclude: ['dev', 'prev', 'dist']
  }
];
