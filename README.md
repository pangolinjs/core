# Front End Styleguide


## Installation

`npm install front-end-styleguide`.

For global CLI access install `npm install -g front-end-styleguide-cli`.  
The CLI needs a local version of front-end-styleguide.



## Project Creation

Create new project with `front-end-styleguide init`.


## Usage

The following tasks are available:
* `front-end-styleguide` to start the default task.
  * Watches for file changes.
  * Starts Browsersync.
* `front-end-styleguide development` to start the default task
  * No file watching / Browsersync.
* `front-end-styleguide preview` to create a prototype preview.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate component HTML.
  * Errors break pipe.
* `front-end-styleguide production` to create production ready files.
  * Minifies CSS, JavaScript and images.
  * Doesn't generate any HTML.
  * Errors break pipe.

If you didn't install the CLI package you have to run `./node_modules/.bin/front-end-styleguide`.

For more information take a look at the [readme of the init folder](init/README.md).
