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
4. [Styleguide CSS](#styleguide-css)
5. [NPM Assets](#npm-assets)
6. [Credits](#credits)


## Dependencies
* [Node.js with npm](https://nodejs.org/)
* Only tested with Node.js Current (v6.x).


## Installation
1. Get the [latest Styleguide release](https://github.com/mvsde/styleguide/releases/latest).
2. Run `npm install` to download Node Modules.
3. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.

*To update previously downloaded Node Modules run `npm update`.*


## Usage

### Tasks
These are the main Gulp tasks:
* Run `gulp` to start the default task. This task runs in the background, watches for file changes and starts Browsersync.
* Run `gulp development` to start the default task without file watching and Browsersync.
* Run `gulp production` to create prduction ready files. This task minifies CSS, JavaScript and images.

There are more tasks available for standalone execution:
* `css-dev` and `css-dist` for Sass compilation.
* `js-dev` and `js-dist` for JavaScript concatenation and linting.
* `html-dev` and `html-dist` for static HTML file generation.
* `img-dev` and `img-dist` for image copying and icon sprite generation.

*The generated folders `dev` and `dist` are not versioned by Git.*


### CSS
Located in `src/css`.  
Output to `dev/css` or `dist/css`.

*Sass* is a CSS preprocessor supporting variables, nesting and mixins – among many other features. For a quick start jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [HTML](#html) for the HTML-side of componentization.

The function `@import` includes other Sass or CSS files in the main Sass file. The final output is one large CSS file to minimize browser requests. See `src/css/main.scss` for more information.

*The development task generates sourcemaps. The production task minifies the CSS.*


### JavaScript
Located in `src/js`.  
Output to `dev/js` or `dist/js`.

JavaScript files are concatenated in the following order: First files from `libraries`, then files from `functions` and lastly files from `components`. Within these folders the order is alphabetical. Subfolders are possible aswell.

Files from `functions` and `components` are transpiled with [Babel](https://babeljs.io/) and the ES2015 preset. ESLint is configured for ES2015 aswell, see `gulp/eslint.json` and [ESLint rules documentation](http://eslint.org/docs/rules/) for more options.

All third-party stuff should be placed inside the folder `src/js/libraries`. Babel and ESLint ignore files in this folder to prevent errors.

*The development task runs ESLint and generates sourcemaps. The production task uglifies the source.*


### HTML
Located in `src/html`.  
Output to `dev` or `dist` for pages and `dev/components` or `dist/components` for components.

*Handlebars* is an HTML templating engine based on JavaScript. Gulp creates static HTML from Handlebars files.

Hierarchy with subfolders is supported. The output reflects the input file tree.


#### Layouts
Layouts determine the scaffolding of the HTML document. They contain the `<head>` area, the outer `<body>` tags, style and script references.

Layouts are located in `src/html/partials/layouts`.

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
Components are reference pages for smaller UI elements. The gulp task `production` will not render them. Pages are prototypes for the final web pages.

The `default` gulp task injects a horizontal navigation bar into both components and pages HTML files for easier switching between them and additional settings.

Components are located in `src/html/components`, pages in `src/html/pages`.

The YAML front matter between the opening `---` and closing `---` contains general information like the page title and description. These will be used primarily by layouts and the Styleguide navigation. Add additional information, which can be accessed via `{{@file.meta.key}}`. Replace `key` with the variable name from the front matter.

```handlebars
---
title: Example
description: Only used for components.
---
{{#extend "layouts/components"}}
{{#content "body"}}
  <p>This will be injected into the layout.</p>
{{/content}}
{{/extend}}
```

Components use additional markup with nicely styled containers:

```handlebars
{{#embed "styleguide/article" title="Some title" description="Some description text." background="#555"}}
{{#content "body"}}
  <p>The component goes here and will be wrapped in a nicely formatted container.</p>
{{/content}}
{{/embed}}
```

The following attributes are available:
* [optional] `title` sets a heading for the component variation.
* [optional] `description` provides additional information.
* [optional] `background` injects `style="background: value"` into the component.


#### Variables

* `{{@file.meta.title}}`: Title of the current component or page.
* `{{@file.meta.description}}`: Description of the current component or page.
* `{{version}}`: Current styleguide version (e.g. "1.7.0").
* `{{lang}}`: Global project language (e.g. "en").
* `{{rel}}`: Relative Link to the web page root.
* `{{displayNav}}`: Returns true for development task.


### Images and Icons
Located in `src/img`.  
Output to `dev/img` or `dist/img`.

All files and folders placed in `src/img` will be copied to `dev/img` or `dist/img`.

SVG files placed in the `src/img/icons` folder will be transformed into an SVG icon sprite named `icons.svg`. The original icons will *not* be copied to the respective `dev/img` or `dist/img` folder.

Icons can be used in HTML with the following syntax:

```html
<svg><use xlink:href="{{rel}}img/icons.svg#icon"></use></svg>
```

The Styleguide ships with [SVG for Everybody](https://github.com/jonathantneal/svg4everybody), a polyfill for browsers that do not support external SVG reference.

*The production task minifies images with a lossless compressor.*


## Styleguide CSS
The components HTML files and the development menu use some styling. All styles are located in `src/html/css/sg.scss`.

*The style definitions located in `src/css` use the prefix `sg-` to ensure compatibility with the main stylesheet.*


## NPM Assets
Files from node modules can be incorporated into the Styleguide. Simply install the module with `npm install --save-dev module-name` and add file and folder paths to `src/npm-assets.js`.

`npm-assets.js` contains an array of objects. Each object has a `glob` and `dest` key:

* `glob` will be passed to `gulp.src()` and specifies which files will be copied. Refer to the [gulp.src documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#globs) for more information regarding globs.
* `dest` sets the destination for the copy process. The development and production tasks each prefix the destination with their specific output folders (e.g. `dev/js` for development). Base path variables from `gulp/paths.js` can be used (`path.css.base`, `path.js.base`, `path.html.base` and `path.img.base`).

```javascript
{
  glob: 'node_modules/svg4everybody/dist/svg4everybody.{js,min.js}',
  dest: paths.js.base
}
```


## Credits

* [Gulp](http://gulpjs.com/)
* [Sass](http://sass-lang.com/)
* [ESLint](http://eslint.org/)
* [Babel](https://babeljs.io/)
* [SVG for Everybody](https://github.com/jonathantneal/svg4everybody)
* [Material icons by Google](https://design.google.com/icons/)
