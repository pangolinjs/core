'use strict';



/* DEPENDENCIES
 * ========================================================================== */

const fs       = require('fs-extra');
const path     = require('path');
const process  = require('process');
const readline = require('readline');
const spawn    = require('child_process').spawn;


let packageJSON = {
  scripts: {
    start: './node_modules/.bin/front-end-styleguide',
    preview: './node_modules/.bin/front-end-styleguide preview',
    production: './node_modules/.bin/front-end-styleguide production'
  },
  devDependencies: {
    'babel-preset-es2015': '^6.9.0',
    'normalize.css': '^5.0.0',
    'svgxuse': '^1.1.20'
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
  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
  });

  let projectFolder = path.parse(dir).name;

  console.log(`
Welcome to the Front End Styleguide initialization process.

Please answer the following questions to generate a custom
package.json for your new project.
`);

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

              console.log(`
Thank you. That's it!
Just wait a few more seconds for the finishing touches.

Installing npm packages…
`);

              spawn('npm', ['install', '--loglevel=error'], {
                cwd: dir,
                stdio: 'inherit'
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
  });
};



/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */

let spawnGulp = function(dir, task) {
  spawn('"' + path.join(__dirname, '/node_modules/.bin/gulp') + '"', [`--dir=${dir}`, task], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
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
