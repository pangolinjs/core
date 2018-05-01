#!/usr/bin/env node

const minimist = require('minimist')
const service = require('../lib/service')

const rawArgv = process.argv.slice(2)
const args = minimist(rawArgv)
const command = args._[0]

service.run(command, args)
