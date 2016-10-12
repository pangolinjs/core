# Front End Development Styleguide

Living Styleguide for componentized front end development.

Uses the [Gulp](http://gulpjs.com/) task runner to compile [Sass](http://sass-lang.com/), [lint](http://eslint.org/) JavaScript, [transpile](https://babeljs.io/) ES6 Code and create static HTML from [Handlebars](http://handlebarsjs.com/).


## Contents
1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Usage](#usage)
  1. [Tasks](#tasks)
  2. [CSS](#css)
  3. [JavaScript](#javascript)
  4. [HTML](#html)
  5. [Images and Icons](#images-and-icons)
  6. [Copy](#copy)
4. [Credits](#credits)


## Dependencies
* [Node.js with npm](https://nodejs.org/)

*Only tested with Node.js Current (v6.x).*


## Installation
1. Get the [latest Styleguide release](https://github.com/mvsde/styleguide/releases/latest).
2. Run `npm install` to download Node modules.
3. Install global Gulp CLI with `npm install -g gulp-cli`. This step is required to get CLI access to gulp.

*Check for outdated Node modules with `npm outdated`.*
*Update Node modules with `npm update`.*


## Usage

### Tasks
These are the main Gulp tasks:
* Run `gulp` to start the default task. Watches for file changes and starts Browsersync.
* Run `gulp development` to start the default task without file watching and Browsersync.
* Run `gulp preview` to create a prototype preview. Minifies CSS, JavaScript and images. Doesn't generate component HTML.
* Run `gulp production` to create prduction ready files. Minifies CSS, JavaScript and images. Doesn't generate any HTML.

There are more tasks available for standalone execution:
* `css-dev`, `css-prev` and `css-dist` for Sass compilation.
* `js-dev`, `js-prev` and `js-dist` for JavaScript concatenation and linting.
* `html-dev` and `html-prev` for static HTML file generation.
* `img-dev`, `img-prev` and `img-dist` for image copying and icon sprite generation.
* `copy-dev`, `copy-prev` and `copy-dist` for copying files from Node modules.

*The generated folders `dev`, `prev` and `dist` are excluded from Git.*


### CSS
Located in `src/css`.  
Output to `dev/css`, `prev/css` or `dist/css`.

*Sass* is a CSS preprocessor supporting variables, nesting and mixins – among many other features. For a quick start jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [HTML](#html) for the HTML-side of componentization.

The function `@import` includes Sass or CSS files in the main Sass file. The final output is one large CSS file to minimize browser requests. See `src/css/main.scss` for more information.

*The development task generates sourcemaps. The preview and production tasks minify the CSS.*


### JavaScript
Located in `src/js`.  
Output to `dev/js`, `prev/js` or `dist/js`.

JavaScript files are bundled together with [Browserify](http://browserify.org/) and transpiled with [Babel](https://babeljs.io/) and the ES2015 preset. [ESLint](http://eslint.org) checks if the code follows common standards.

Global [ESLint rules](http://eslint.org/docs/rules/) are set in `.eslintrc.json`. Per-file rules can be set with comments (e.g. `/* eslint no-console: "off" */`). With a `.eslintignore` file in the project root, JavaScript files can be [excluded from linting](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories). Browserify follows the same `require()` and `modules.exports` system Node uses. This makes loading code from other files or even npm modules very easy. The example setup in `src/js` provides a brief overview of the capabilities.

*The development task generates sourcemaps. The preview and production tasks uglify the source.*


### HTML
Located in `src/html`.  
Output to `dev` or `prev`.

*Handlebars* is an HTML templating engine based on JavaScript. Gulp creates static HTML from Handlebars files.

Hierarchy with subfolders is supported. The output reflects the input file tree.


#### Layouts
Layouts determine the scaffolding of the HTML document. They contain the `<head>` area, the outer `<body>` tags, style and script references.

Layouts are located in `src/html/partials/layouts`.

A minimalistic layout may look like this:
```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{page 'title'}}</title>
  </head>
  <body>
    {{{block "content"}}}
  </body>
</html>
```


#### Includes
These files can be included in all other files (even in other includes). The process is comparable to PHP's `include`.

Includes are located in `src/html/partials/includes`.

The syntax `{{> "includes/example"}}` includes the file `src/html/partials/includes/example.hbs`.


#### Components and Pages
Component pages are references for UI elements. The gulp task `preview` will not render them.

Pages are prototypes for the final web pages.

The `default` gulp task injects a navigation bar into both component and page HTML files for fast site switching and additional settings.

Components are located in `src/html/pages/components`, pages in `src/html/pages`.

The YAML front matter between the opening `---` and closing `---` contains general information like the title, description and category. These will be used primarily by layouts and the Styleguide navigation. The front matter can be accessed with `{{page "key"}}`. Replace `key` with the name from the front matter.

A simple component page is defined by it's category and the correspondening layout:
```handlebars
---
title: Example
description: More detailed than the title
category: Components
---
{{#extend "layouts/components"}}
{{#content "body"}}
  <p>This will be injected into the layout.</p>
{{/content}}
{{/extend}}
```

Components may use additional markup within the main body with nicely styled containers:
```handlebars
{{#embed "styleguide/article" title="Some title" description="Some description text." background="#555"}}
{{#content "body"}}
  <p>The component goes here and will be wrapped in a nicely formatted container.</p>
{{/content}}
{{/embed}}
```

The following parameters are available:
* [optional] `title` sets a heading for the component variation.
* [optional] `description` provides additional information.
* [optional] `background` injects `style="background: value"` into the component.


#### Default Variables

* `{{meta.version}}`: Current styleguide version (e.g. "1.7.0").
* `{{meta.lang}}`: Global project language (e.g. "en").
* `{{meta.dev}}`: Returns true for development task.
* `{{page "title"}}`: Title of the current page.
* `{{page "description"}}`: Description of the current page.
* `{{page "category"}}`: Category of the current page.
* `{{page "filebase"}}`: The name of the current page file without extension (e.g. "index").
* `{{page "filename"}}`: The name of the current page file with extension (e.g. "index.html").
* `{{page "filepath"}}`: Relative path containing the filename of the current page (e.g. "components/header.html").
* `{{page "rel"}}`: Relative path to the root (e.g. "../").


#### Styleguide CSS
The component HTML files and the development menu use some styling. All styles are located in `src/html/css/sg.scss`.

*The style definitions located in `src/css` use the prefix `sg-` to ensure compatibility with the main stylesheet.*


### Images and Icons
Located in `src/img`.  
Output to `dev/img`, `prev/img` or `dist/img`.

All files and folders placed in `src/img` will be copied to `dev/img`, `prev/img` or `dist/img`.

SVG files placed in the `src/img/icons` folder will be transformed into an SVG icon sprite named `icons.svg`. The original icons will *not* be copied to output folders. SVG symbols can be referenced with their ID. The icon workflow creates IDs from the filename of the original SVG placed in `src/img/icons`. Each ID is suffixed with "-icon" for better compatibility with browsers that need a polyfill.

Icons can be used in HTML with the following syntax:
```html
<svg width="24" height="24">
  <use xlink:href="{{page 'rel'}}img/icons.svg#filename-icon"></use>
</svg>
```

Specifying intrinsic dimensions is considered good style. Without an intrinsic width and height browsers often scale SVGs to fill the whole viewport. This happens if dimensions set in CSS fail to load.

This styleguide ships with [svgxuse](https://github.com/Keyamoon/svgxuse), a polyfill for browsers that do not support external SVG reference.

*The preview and production tasks minify images with a lossless compressor.*


### Copy
Files that don't fit in the above mentioned categories can be integrated into the styleguide with the file `gulp/copy.js`. To integrate files from Node modules, simply install the module with `npm install --save-dev module-name` and add files or folders to `copy.js`.

`copy.js` contains an array of objects. Each object is a copy instruction and has a `folder`, `files` and `dest` key.

* `folder` is the base path.
* `files` specifies which files and folders will be copied. The folder structure will be kept (e.g. `dist/**` results in `dev/js/dist/**`). Use [globs](https://github.com/isaacs/node-glob#glob-primer) to copy more than one file.
* `dest` sets the destination for the copy process. The development, preview and production tasks each prefix the destination with their specific output folders (e.g. `dev/` for development). Base path variables from `gulp/paths.js` can be used (`path.css.base`, `path.js.base`, `path.html.base` and `path.img.base`). But feel free to set arbitrary destinations.

Beware of overwriting files from other tasks (e.g. `css/styles.css`), the copy task is started last. Due to asynchronous task execution the exact write order is unknown.

#### Copy single files
```javascript
module.exports = [
  {
    folder: 'node_modules/svgxuse',
    files: 'svgxuse.{js,min.js}',
    dest: paths.js.base
  }
];
```
This declaration copies the files `node_modules/svgxuse/svgxuse.js` and `node_modules/svgxuse/svgxuse.min.js` to `taskfolder/js/svgxuse.js` and `taskfolder/js/svgxuse.min.js`. `taskfolder` is either `dev`, `prev` or `dist` depending on the task.

#### Preserve original folder structure
```javascript
module.exports = [
  {
    folder: 'node_modules/@polymer',
    files: '**',
    dest: 'polymer'
  }
];
```
Everything from `node_modules/@polymer` will be copied to `taskfolder/polymer`. Subfolders will be kept as is.

#### Remove original folder structure
```javascript
module.exports = [
  {
    folder: 'node_modules/@polymer/font-roboto',
    files: '**',
    dest: 'polymer'
  }
];
```
Everything from `node_modules/@polymer/font-roboto` will be copied to `taskfolder/polymer`. No `font-roboto` folder will be created.


## Credits

* [Material icons by Google](https://design.google.com/icons/)
