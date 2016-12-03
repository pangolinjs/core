'use strict';



/* DEPENDENCIES
 * ========================================================================== */

const chalk   = require('chalk');
const init    = require('front-end-styleguide-init');
const process = require('process');
const spawn   = require('child_process').spawn;



/* SEARCH LOCAL INSTALLATION
 * ========================================================================== */

let searchLocalInstallation = (dir) => {
  try {
    require.resolve(`${dir}/node_modules/front-end-styleguide`);
  } catch (error) {
    console.error(`
${chalk.black.bgRed(' ERROR ')} Local front-end-styleguide not found in ${chalk.magenta(dir)}

Start a new project: front-end-styleguide init
Install locally:     npm install front-end-styleguide --save-dev
`);
    process.exit(1);
  }
};



/* UPDATE PROJECT
 * ========================================================================== */

let updateProject = function(dir) {
  spawn('npm', ['update'], {
    cwd: dir,
    stdio: 'inherit'
  }).on('close', (code) => {
    process.exit(code);
  });
};



/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */

let spawnGulp = function(dir, task) {
  spawn(`"${dir}/node_modules/.bin/gulp"`, [`--dir=${dir}`, task], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  }).on('close', (code) => {
    process.exit(code);
  });
};



/* EXPOSE to OUTER SPACE
 * ========================================================================== */

module.exports = function() {
  let argument = process.argv[2] || 'default';

  if (argument === 'init') {
    init(process.cwd());
  } else if (argument === 'update') {
    searchLocalInstallation(process.cwd());
    updateProject(process.cwd());
  } else {
    searchLocalInstallation(process.cwd());
    spawnGulp(process.cwd(), argument);
  }
};
