'use strict'

/* DEPENDENCIES
 * ========================================================================== */

const chalk = require('chalk')
const init = require('front-end-styleguide-init')
const path = require('path')
const spawn = require('child_process').spawn

/* SEARCH LOCAL INSTALLATION
 * ========================================================================== */

const searchLocalInstallation = dir => {
  try {
    require.resolve(`${dir}/node_modules/front-end-styleguide`)
  } catch (error) {
    console.error(`
${chalk.black.bgRed('ERROR')} Local front-end-styleguide not found in ${chalk.magenta(dir)}

Start a new project: front-end-styleguide init
Install locally:     npm install front-end-styleguide --save-dev
`)
    process.exit(1)
  }
}

/* UPDATE PROJECT
 * ========================================================================== */

const updateProject = function (dir) {
  spawn('npm', ['update'], {
    cwd: dir,
    shell: true,
    stdio: 'inherit'
  }).on('close', code => {
    process.exit(code)
  })
}

/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */

const spawnGulp = function (dir, args) {
  const gulpBin = path.resolve(require.resolve('gulp'), '../bin/gulp.js')

  spawn(`node "${gulpBin}"`, [...args, `--dir="${dir}"`], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  }).on('close', code => {
    process.exit(code)
  })
}

/* EXPOSE to OUTER SPACE
 * ========================================================================== */

module.exports = function () {
  const processArgs = process.argv
  const args = processArgs.slice(2)

  switch (args[0]) {
    case 'init':
      init(process.cwd())
      break

    case 'update':
      if (!process.env.TEST) {
        searchLocalInstallation(process.cwd())
      }
      updateProject(process.cwd())
      break

    default:
      if (!process.env.TEST) {
        searchLocalInstallation(process.cwd())
      }
      spawnGulp(process.cwd(), args)
      break
  }
}
