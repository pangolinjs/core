#!/usr/bin/env node

import { green } from 'kleur/colors'

import build from '../commands/build.mjs'
import dev from '../commands/dev.mjs'
import inspect from '../commands/inspect.mjs'

const command = process.argv[2]
const context = process.cwd()

switch (command) {
  case 'dev':
    dev({ context })
    break
  case 'build':
    build({ context })
    break
  case 'inspect':
    inspect({ context, command: process.argv[3] })
    break
  default:
    console.log('Please use one of the following commands:')
    console.log('  - dev')
    console.log('  - build')
    console.log('  - inspect (dev|build)')
    console.log(`\nFor example: ${green('pangolin-core dev')}`)
}
