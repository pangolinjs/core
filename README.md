# Front End Styleguide


## Installation

* Global: `npm install -g front-end-styleguide`.
* Local: `npm install front-end-styleguide`.


## Project Creation

Create new project with `front-end-styleguide init`.


## Usage

The following tasks are available:
* `front-end-styleguide` to start the default task. Watches for file changes and starts Browsersync.
* `front-end-styleguide development` to start the default task without file watching / Browsersync.
* `front-end-styleguide preview` to create a prototype preview. Minifies CSS, JavaScript and images. Doesn't generate component HTML.
* `front-end-styleguide production` to create production ready files. Minifies CSS, JavaScript and images. Doesn't generate any HTML.

If you installed a local version you have to run:  
`./node_modules/.bin/front-end-styleguide` instead of `front-end-styleguide`.

For more information take a look at the [readme of the init folder](init#readme).
