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
  6. [NPM Assets](#npm-assets)
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
* `npmassets-dev`, `npmassets-prev` and `npmassets-dist` for copying files from Node modules.

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

JavaScript files are concatenated in the following order: First files from `libraries`, then from `functions` and lastly from `components`. Within these folders the order is alphabetical. Subfolders are supported as well.

Files from `functions` and `components` are transpiled with [Babel](https://babeljs.io/) and the ES2015 preset. ESLint is configured for ES2015 aswell, see `gulp/eslint.json` and [ESLint rules documentation](http://eslint.org/docs/rules/) for more options.

All third-party stuff should be placed inside the folder `src/js/libraries`. Babel and ESLint ignore files in this folder to prevent errors.

*The development task runs ESLint and generates sourcemaps. The preview and production tasks uglify the source.*


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
    <title>{{@file.meta.title}}</title>
  </head>
  <body>
    {{{block "body"}}}
  </body>
</html>
```


#### Includes
These files can be included in all other files (even in other includes). The process is comparable to PHP's `include`.

Includes are located in `src/html/partials/includes`.

The syntax `{{> "includes/example" }}` includes the file `src/html/partials/includes/example.hbs`.


#### Components and Pages
Component pages are references for UI elements. The gulp task `preview` will not render them.

Pages are prototypes for the final web pages.

The `default` gulp task injects a navigation bar into both component and page HTML files for fast site switching and additional settings.

Components are located in `src/html/pages/components`, pages in `src/html/pages`.

The YAML front matter between the opening `---` and closing `---` contains general information like the title, description and category. These will be used primarily by layouts and the Styleguide navigation. The front matter can be accessed with `{{@file.meta.key}}`. Replace `key` with the name from the front matter.

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

* `{{@file.meta.title}}`: Title of the current component or page.
* `{{@file.meta.description}}`: Description of the current component or page.
* `{{version}}`: Current styleguide version (e.g. "1.7.0").
* `{{lang}}`: Global project language (e.g. "en").
* `{{rel}}`: Relative path to the root (e.g. "../").
* `{{filepath}}`: Relative path containing the filename of the current page (e.g. "components/header.html").
* `{{dev}}`: Returns true for development task.


#### Styleguide CSS
The component HTML files and the development menu use some styling. All styles are located in `src/html/css/sg.scss`.

*The style definitions located in `src/css` use the prefix `sg-` to ensure compatibility with the main stylesheet.*


### Images and Icons
Located in `src/img`.  
Output to `dev/img`, `prev/img` or `dist/img`.

All files and folders placed in `src/img` will be copied to `dev/img`, `prev/img` or `dist/img`.

SVG files placed in the `src/img/icons` folder will be transformed into an SVG icon sprite named `icons.svg`. The original icons will *not* be copied to output folders.

Icons can be used in HTML with the following syntax:
```html
<svg><use xlink:href="{{rel}}img/icons.svg#icon"></use></svg>
```

This styleguide ships with [svgxuse](https://github.com/Keyamoon/svgxuse), a polyfill for browsers that do not support external SVG reference.

*The preview and production tasks minify images with a lossless compressor.*


### NPM Assets
Files from Node modules can be incorporated into the styleguide. Simply install the module with `npm install --save-dev module-name` and add file or folder paths to `src/npm-assets.js`.

`npm-assets.js` contains an array of objects. Each object has a `glob` and `dest` key:

* `glob` will be passed to `gulp.src()` and specifies which files will be copied. Refer to the [gulp.src documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#globs) for more information regarding globs.
* `dest` sets the destination for the copy process. The development, preview and production tasks each prefix the destination with their specific output folders (e.g. `dev/js` for development). Base path variables from `gulp/paths.js` can be used (`path.css.base`, `path.js.base`, `path.html.base` and `path.img.base`).

The following example is the default example:
```javascript
module.exports = [
  {
    glob: 'node_modules/svgxuse/svgxuse.{js,min.js}',
    dest: paths.js.base
  }
];
```


## Credits

* [Material icons by Google](https://design.google.com/icons/)
