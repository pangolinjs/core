# Front End Styleguide

[![JavaScript Style Guide][standard-image]][standard-url]

[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][npm-url]


## Installation

For CLI access run `npm install -g front-end-styleguide-cli`.  
For local installation run `npm install front-end-styleguide --save-dev`.


## Project Creation

Create a new project with `front-end-styleguide init`.

*If you didn't install the CLI package please run `./node_modules/.bin/front-end-styleguide init`.*


## Usage

The following tasks are available:
* `front-end-styleguide` to start the default task.
  * Watches for file changes.
  * Starts Browsersync.
* `front-end-styleguide development` to start the default task
  * No file watching / Browsersync.
* `front-end-styleguide preview` to create a prototype preview.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate component HTML.
  * Errors break pipe.
* `front-end-styleguide production` to create production ready files.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate any HTML.
  * Errors break pipe.

Custom configuration files can be specified:
* `front-end-styleguide [task] --config=path/to/config.json --paths=path/to/paths.json`

For more information take a look at the [templates of the init package](https://github.com/mvsde/styleguide-init/blob/master/templates).

*If you didn't install the CLI package please run `./node_modules/.bin/front-end-styleguide [task] [options]`.*


[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard

[npm-image]: https://img.shields.io/npm/v/front-end-styleguide.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/front-end-styleguide

[dependencies-image]: https://img.shields.io/david/mvsde/styleguide.svg?style=flat-square
