/* HELLO WORLD
 * An example JavaScript function.
============================================================================= */

/* exported helloWorld */



function helloWorld() {
  'use strict';

  for (let argument of arguments) {
    console.log('Hello World, ' + argument);
  }
}
