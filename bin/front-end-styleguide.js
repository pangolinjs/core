#!/usr/bin/env node

switch (process.argv[2]) {
  case 'lint:html':
    require('../build/html/lint')(process.cwd())
    break
  case 'dev':
    require('../build/dev-server')(process.cwd())
    break
  case 'build':
    require('../build/build')(process.cwd())
    break
  case 'build:dev':
    require('../build/build-dev')(process.cwd())
    break
  case 'build:proto':
    require('../build/build-proto')(process.cwd())
    break
  default:
    console.log(`
Available commands:

- lint:html
- dev
- build
- build:dev
- build:proto`)
}
