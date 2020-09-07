#!/usr/bin/env node

import { green } from 'kleur/colors'

import buildCommand from '../commands/build.mjs'
import devCommand from '../commands/dev.mjs'
import inspectCommand from '../commands/inspect.mjs'
import staticCommand from '../commands/static.mjs'

const command = process.argv[2]
const context = process.cwd()

switch (command) {
  case 'dev':
    devCommand({ context })
    break
  case 'build':
    buildCommand({ context })
    break
  case 'static':
    staticCommand({ context })
    break
  case 'inspect':
    inspectCommand({ context, command: process.argv[3] })
    break
  default:
    console.log(`Please use one of the following commands:`)
    console.log(`  - dev`)
    console.log(`  - build`)
    console.log(`  - inspect (dev|build|static)`)
    console.log(`\nFor example: ${green('pangolin-core dev')}`)
}
