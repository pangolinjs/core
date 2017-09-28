#!/usr/bin/env node

switch (process.argv[2]) {
  case 'dev':
    require('../build/dev-server')(process.cwd())
    break
  case 'build':
    require('../build/build')(process.cwd())
    break
  case 'build-dev':
    require('../build/build-dev')(process.cwd())
    break
  default:
    console.log('Please use `dev` or `build`.')
}
