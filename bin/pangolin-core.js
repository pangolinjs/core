#!/usr/bin/env node

import { green } from 'kleur/colors'

import build from '../commands/build.js'
import dev from '../commands/dev.js'
import docs from '../commands/docs.js'
import inspect from '../commands/inspect.js'

const command = process.argv[2]
const context = process.cwd()

switch (command) {
  case 'dev':
    dev({ context })
    break
  case 'build':
    build({ context })
    break
  case 'docs':
    docs({ context })
    break
  case 'inspect':
    inspect({ context, command: process.argv[3] })
    break
  default:
    console.log('Please use one of the following commands:')
    console.log('  - dev')
    console.log('  - build')
    console.log('  - docs')
    console.log('  - inspect (dev|build)')
    console.log(`\nFor example: ${green('pangolin-core dev')}`)
}
