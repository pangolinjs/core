'use strict';



/* DEPENDENCIES
 * ========================================================================== */

const chalk    = require('chalk');
const fs       = require('fs-extra');
const path     = require('path');
const process  = require('process');
const readline = require('readline');
const spawn    = require('child_process').spawn;



/* SETTINGS
 * ========================================================================== */

let packageJSON = {
  scripts: {
    start: './node_modules/.bin/front-end-styleguide',
    development: './node_modules/.bin/front-end-styleguide development',
    preview: './node_modules/.bin/front-end-styleguide preview',
    production: './node_modules/.bin/front-end-styleguide production'
  },
  devDependencies: {
    'babel-preset-es2015': '^6.9.0',
    'front-end-styleguide': '^2.1.3',
    'normalize.css': '^5.0.0',
    'svgxuse': '^1.1.23'
  }
};

let gitignore =
`# OS specific stuff
Thumbs.db
Desktop.ini
.DS_Store
._*
*~

# Logs
logs
*.log
npm-debug.log*

# Dependency directory
node_modules

# Generated content
dev
prev
dist
`;



/* INITIALIZE NEW PROJECT
 * ========================================================================== */

let initProject = function(dir) {
  console.log('\n' + chalk.black.bgWhite(' Front End Styleguide Initialization ') + '\n');
  console.log('Please answer the following questions to generate a custom\npackage.json for your new project.\n');

  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
  });

  let projectFolder = path.parse(dir).name;

  rl.question(`Project name: (${projectFolder}) `, (projectName) => {
    projectName = projectName || projectFolder;
    packageJSON.name = projectName.toLowerCase().replace(' ', '-');

    rl.question('Project description: ', (projectDescription) => {
      if (projectDescription) {
        packageJSON.description = projectDescription;
      }

      rl.question('Version: (1.0.0) ', (version) => {
        version = version || '1.0.0';
        packageJSON.version = version;

        rl.question('Author name: ', (authorName) => {
          if (authorName) {
            packageJSON.author = authorName;
          }

          rl.question('Author email: ', (authorEmail) => {
            if (authorEmail && packageJSON.author.length) {
              packageJSON.author += authorEmail ? ` <${authorEmail}>` : '';
            } else if (authorEmail) {
              packageJSON.author += `<${authorEmail}>`;
            }

            fs.writeFile(`${dir}/package.json`, JSON.stringify(packageJSON, null, 2), 'utf8', (error) => {
              if (error) {
                return console.error(error);
              }

              console.log('\n' + chalk.green('Thank you. That\'s it!'));
              console.log('Just wait a few more seconds for the finishing touches.\n');
              console.log(chalk.italic('Installing npm packages…') + '\n');

              spawn('npm', ['install', '--loglevel=error'], {
                cwd: dir,
                stdio: 'inherit'
              }).on('close', () => {
                console.log('\nYour new project was successfully set up!');
              });
            });

            fs.writeFile(`${dir}/.gitignore`, gitignore, (error) => {
              if (error) {
                return console.error(error);
              }
            });

            fs.copy(`${__dirname}/init`, dir, (error) => {
              if (error) {
                return console.error(error);
              }
            });

            rl.close();
          });
        });
      });
    });
  });
};



/* UPDATE PROJECT
 * ========================================================================== */

let updateProject = function(dir) {
  spawn('npm', ['install'], {
    cwd: dir,
    stdio: 'inherit'
  }).on('close', (code) => {
    process.exit(code);
  });
};



/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */

let spawnGulp = function(dir, task) {
  spawn('node', [`"${path.dirname(require.resolve('gulp'))}/bin/gulp.js"`, `--dir=${dir}`, task], {
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
    initProject(process.cwd());
  } else if (argument === 'update') {
    updateProject(process.cwd());
  } else {
    spawnGulp(process.cwd(), argument);
  }
};
