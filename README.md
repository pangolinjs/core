# <img alt="" src="https://cdn.jsdelivr.net/gh/pangolinjs/brand@master/icon/icon.svg" width="24"> Pangolin

[![GitHub Actions][actions-image]][actions-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![JavaScript Standard Style][standard-image]][standard-url]

Framework for componentized front end development with Nunjucks, Sass, and JavaScript.


## Installation

```bash
npm install -g @pangolin/cli
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

For more information take a look at the [Pangolin docs](https://pangolinjs.org).


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
docker build -t pangolin-dev .

# Start dev server
docker run -it -p 8080:8080 --entrypoint npm pangolin-dev run dev -- --host 0.0.0.0

# Build files
docker run -it --entrypoint npm pangolin-dev run build
docker run -it --entrypoint npm pangolin-dev run build:dev
```


[actions-image]: https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/pangolinjs/core?style=flat-square
[actions-url]: https://github.com/pangolinjs/core/actions

[npm-image]: https://img.shields.io/npm/v/@pangolin/core.svg?style=flat-square&logo=npm
[npm-url]: https://www.npmjs.com/package/@pangolin/core

[dependencies-image]: https://img.shields.io/david/pangolinjs/core.svg?style=flat-square
[dependencies-url]: https://www.npmjs.com/package/@pangolin/core?activeTab=dependencies

[standard-image]: https://img.shields.io/badge/Code_Style-Standard-brightgreen.svg?style=flat-square&logo=javascript&logoColor=white
[standard-url]: https://standardjs.com
