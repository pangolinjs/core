# Front-End Styleguide
Boilerplate for styleguide driven front end development.
Uses the [Gulp] (http://gulpjs.com/) task runner to compile Sass files and lint JavaScript.

`dev` and `dist` folders are not included with git.

1. [Dependencies] (#dependencies)
2. [Installation] (#installation)
3. [Usage] (#usage)

## Dependencies
* [Node.js with npm] (https://nodejs.org/)

## Installation
1. Switch to the styleguide directory.
2. Run `npm install` to download Node Modules.
3. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.

## Usage
* Run `gulp` to start the default task. This task watches for file changes.
* Run `gulp distribution` to create prduction ready resources. This task compresses and minifys all files.
