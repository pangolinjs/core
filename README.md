# <img alt="" src="https://cdn.rawgit.com/pangolinjs/brand/master/icon/icon.svg" width="24"> Pangolin

[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][npm-url]
[![JavaScript Standard Style][standard-image]][standard-url]

Framework for componentized front end development with Nunjucks, Sass, and JavaScript.


## Installation

```bash
# Yarn
yarn global add @pangolin/cli

# npm
npm install -g @pangolin/cli
```


## Project Creation

```bash
mkdir new-project
cd new-project
pangolin init
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

# Build for static file servers
yarn build:dev
# or
npm run build:dev

# Run linting
yarn lint:css
yarn lint:js
# or
npm run lint:css
npm run lint:js
```

For more information take a look at the [docs](https://pangolinjs.org).


## Framework development

```bash
# Build UI
yarn prepare
# or
npm run prepare

# Testing
yarn test:unit
# or
npm run test:unit

# Linting
yarn lint:css
yarn lint:js
# or
npm run lint:css
npm run lint:js
```


[npm-image]: https://img.shields.io/npm/v/@pangolin/core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@pangolin/core

[dependencies-image]: https://img.shields.io/david/pangolinjs/core.svg?style=flat-square

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://standardjs.com
