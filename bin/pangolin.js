#!/usr/bin/env node

const minimist = require('minimist')

const rawArgv = process.argv.slice(2)
const args = minimist(rawArgv)
const command = args._[0]

require(`../lib/commands/${command}`)(args)
