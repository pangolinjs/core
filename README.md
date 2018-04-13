# <img alt="" src="https://cdn.rawgit.com/front-end-styleguide/brand/master/mark/mark.svg" width="24"> Front End Styleguide

[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][npm-url]
[![JavaScript Standard Style][standard-image]][standard-url]

Pattern library framework for styleguide driven development with Sass, ES6+ and Nunjucks.


## Installation

```bash
# Yarn
yarn global add front-end-styleguide-cli

# npm
npm install -g front-end-styleguide-cli
```


## Project Creation

```bash
mkdir new-project
cd new-project
front-end-styleguide init
```


## Usage

```bash
# Start dev server
yarn dev
# or
npm run dev

# Build files for production
yarn build
# or
npm run build

# Build static styleguide with prototypes and components
yarn build:dev
# or
npm run build:dev

# Build static styleguide with prototypes only
yarn build:proto
# or
npm run build:proto

# Run linting
yarn lint
# or
npm run lint

# Run unit and e2e tests
yarn test
# or
npm run test
```

For more information take a look at the [docs](https://github.com/front-end-styleguide/docs).


## Test the core package

```bash
# Linting
yarn lint
# or
npm run lint

# Automated testing
yarn test
# or
npm run test

# Dev server and build testing
yarn test:dev
yarn test:build
yarn test:build:dev
yarn test:build:proto
# or
npm run test:dev
npm run test:build
npm run test:build:dev
npm run test:build:proto
```


[npm-image]: https://img.shields.io/npm/v/front-end-styleguide.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/front-end-styleguide

[dependencies-image]: https://img.shields.io/david/front-end-styleguide/core.svg?style=flat-square

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://standardjs.com
