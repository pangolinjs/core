# <img alt="" src="https://cdn.jsdelivr.net/gh/pangolinjs/brand/icon/icon.svg" width="24"> Pangolin.js

[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![JavaScript Standard Style][standard-image]][standard-url]

Framework for componentized front end development with Nunjucks, Sass, and JavaScript.

Requires [Node.js v12.10 or higher](https://nodejs.org).

## Installation

```bash
npm install -g @pangolinjs/cli
```

## Project Creation

```bash
mkdir new-project
cd new-project
pangolin init
```

## Usage

### Start dev server

```bash
npm run dev
```

### Build files for production

```bash
npm run build
```

### Build for static file servers

```bash
npm run build:dev
```

### Lint CSS and JavaScript

```bash
npm run lint:css
npm run lint:js
```

For more information take a look at the [Pangolin.js docs](https://pangolinjs.org).

## Contribute

```bash
# Build UI
npm run prepare

# Testing
npm run test:unit

# Linting
npm run lint:css
npm run lint:js
```

### Docker test

```bash
# Build image
docker build -t pangolinjs:dev .

# Start dev server
docker run -it -p 8080:8080 --entrypoint npm pangolinjs:dev run dev

# Build files
docker run -it --entrypoint npm pangolinjs:dev run build
docker run -it --entrypoint npm pangolinjs:dev run build:dev
```

[npm-image]: https://img.shields.io/npm/v/@pangolinjs/core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@pangolinjs/core

[dependencies-image]: https://img.shields.io/david/pangolinjs/core.svg?style=flat-square
[dependencies-url]: https://www.npmjs.com/package/@pangolinjs/core?activeTab=dependencies

[standard-image]: https://img.shields.io/badge/Code_Style-Standard-brightgreen.svg?style=flat-square&logo=javascript&logoColor=white
[standard-url]: https://standardjs.com
