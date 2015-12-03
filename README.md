# Front-End Styleguide
Boilerplate for front-end development with Sass, JavaScript and HTML.
Uses the [Gulp] (http://gulpjs.com/) task runner to compile Sass files and lint JavaScript.

`dev` and `dist` folders are not included with git.

1. [Dependencies] (#dependencies)
2. [Installation] (#installation)
3. [Usage] (#usage)

## Dependencies
* [Node.js with npm] (https://nodejs.org/)

## Installation
1. Switch to the styleguide directory.
2. Run `npm install` to download Node Modules.
3. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.

## Usage
* Run `gulp` to start the default task. This task watches for file changes.
* Run `gulp distribution` to create prduction ready resources. This task compresses and minifys all files.

## Folder Structure

### Source Folder
```
src
├── assets
├── css
│   ├── base
|   |   ├── _normalize.scss
|   |   ├── _print.scss
|   |   ├── _scaffolding.scss
|   |   ├── _shame.scss
|   |   ├── _typography.scss
|   |   ├── _utilities.scss
|   |   └── _variables.scss
|   ├── components
|   |   ├── _buttons.scss
|   |   └── _forms.scss
|   ├── functions
|   |   └── _colors.scss
|   ├── layouts
|   |   ├── _embed-responsive.scss
|   |   └── _grid.scss
|   ├── mixins
|   |   ├── _border-radius.scss
|   |   ├── _clearfix.scss
|   |   ├── _grid-framework.scss
|   |   ├── _grid.scss
|   |   ├── _image.scss
|   |   ├── _opacity.scss
|   |   ├── _tab-focus.scss
|   |   └── _text-hide.scss
|   └── styles.scss
├── html
|   └── index.html
└── js
    └── main.js
```
