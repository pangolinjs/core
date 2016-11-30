'use strict';



/* DEPENDENCIES
 * ========================================================================== */


const fs       = require('fs');
const ncp      = require('ncp');
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
}

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

  rl.question(`Project name: (${projectFolder}) `, (answer) => {
    answer = answer || projectFolder;
    packageJSON.name = answer.toLowerCase().replace(' ', '-');

    rl.question('Project description: ', (answer) => {
      if (answer) {
        packageJSON.description = answer;
      }

      rl.question('Version: (1.0.0) ', (answer) => {
        answer = answer || '1.0.0';
        packageJSON.version = answer;

        rl.question('Author name: ', (answer) => {
          if (answer) {
            packageJSON.author = answer;
          }

          rl.question('Author e-mail: ', (answer) => {
            if (answer && packageJSON.author.length) {
              packageJSON.author += answer ? ` <${answer}>` : '';
            } else if (answer) {
              packageJSON.author += `<${answer}>`;
            }

            fs.writeFile(`${dir}/package.json`, JSON.stringify(packageJSON, null, 2), 'utf8', (error) => {
              if (error) {
                return console.error(error);
              }

              spawn('npm', ['install'], {
                cwd: dir,
                stdio: 'inherit'
              });
            });

            fs.writeFile(`${dir}/.gitignore`, gitignore, (error) => {
              if (error) {
                return console.error(error);
              }
            });

            ncp(`${__dirname}/example`, dir, (error) => {
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



/* RUN GULP with optional ARGUMENTS
 * ========================================================================== */


let spawnGulp = function(dir, task) {
  spawn('"' + path.join(__dirname, '/node_modules/.bin/gulp') + '"', [`--dir=${dir}`, task], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  });
};



/* DECIDE between INIT and GULP
 * ========================================================================== */


let run = function() {
  let argument = process.argv[2] || 'default';

  if (argument === 'init') {
    initProject(process.cwd());
  } else {
    spawnGulp(process.cwd(), argument);
  }
}

module.exports = run;
