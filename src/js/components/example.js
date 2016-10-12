/* EXAMPLE
 *
 * Use the function from the `functions/helloWorld.js` file.
============================================================================= */



// Dependencies
// =========================================================

const helloWorld = require('../functions/helloWorld.js');



// Export
// =========================================================

module.exports = function() {
  helloWorld(['foo', 'bar', 'baz']);
};
