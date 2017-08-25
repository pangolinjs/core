# <img alt="" src="https://cdn.rawgit.com/front-end-styleguide/brand/master/mark/mark.svg" width="24"> Front End Styleguide

[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][npm-url]
[![JavaScript Standard Style][standard-image]][standard-url]


## Installation

```bash
# Yarn
yarn global add front-end-styleguide-cli

# npm
npm install -g front-end-styleguide-cli
```


## Project Creation

Create a new project with `front-end-styleguide init`.


## Usage

The following tasks are available:
* `front-end-styleguide dev` to start the default task.
  * Watches for file changes.
  * Starts Browsersync.
* `front-end-styleguide build:dev` to start the default task
  * No file watching / Browsersync.
* `front-end-styleguide build:prev` to create a prototype preview.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate component HTML.
  * Errors break pipe.
* `front-end-styleguide build` to create production ready files.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate any HTML.
  * Errors break pipe.

Custom configuration files can be specified: `front-end-styleguide [task] --config=path/to/config.json --paths=path/to/paths.json`.

For more information take a look at the [templates of the init package](https://github.com/front-end-styleguide/styleguide-init/blob/master/templates).


## Test

```bash
# Yarn
yarn test
yarn watchtest

# npm
npm test
npm run watchtest
```

The default test runs all styleguide build tasks. The watchtest starts the development task with file watching and Browsersync.


[npm-image]: https://img.shields.io/npm/v/front-end-styleguide.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/front-end-styleguide

[dependencies-image]: https://img.shields.io/david/front-end-styleguide/styleguide.svg?style=flat-square

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://standardjs.com
