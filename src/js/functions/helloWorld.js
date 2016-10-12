/* HELLO WORLD
 *
 * Logs `Hello World, <name>` to the console.
 *
 * Fallback to awesome Star Wars character names,
 * if `names` argument is missing.
============================================================================= */



// Export
// =========================================================

module.exports = function(names = ['Yoda', 'Obi-Wan']) {
  for (let i = 0; i < names.length; i++) {
    /* eslint no-console: "off" */
    console.log('Hello World, ' + names[i]);
  }
};
