/* HELLO WORLD
 * An example JavaScript function.
============================================================================= */

/* exported helloWorld */


function helloWorld(names = ['Yoda', 'Obi-Wan']) {
  for (let i = 0; i < names.length; i++) {
    /* eslint no-console: "off" */
    console.log('Hello World, ' + names[i]);
  }
}
