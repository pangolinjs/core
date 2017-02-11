'use strict';



/* DEPENDENCIES
 * ========================================================================== */

const chalk = require('chalk');
const init  = require('front-end-styleguide-init');
const path  = require('path');
const spawn = require('child_process').spawn;



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
    shell: true,
    stdio: 'inherit'
  }).on('close', (code) => {
    process.exit(code);
  });
};



/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */

let spawnGulp = function(dir, args) {
  const gulpBin = path.resolve(require.resolve('gulp'), '../bin/gulp.js');

  spawn(`node "${gulpBin}"`, [...args, `--dir="${dir}"`], {
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
  let processArgs = process.argv;
  let args = processArgs.slice(2);

  if (args[0] === 'init') {
    init(process.cwd());
  } else if (args[0] === 'update') {
    searchLocalInstallation(process.cwd());
    updateProject(process.cwd());
  } else {
    if (!process.env.TEST) {
      searchLocalInstallation(process.cwd());
    }
    spawnGulp(process.cwd(), args);
  }
};
