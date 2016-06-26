# Front-End Styleguide
Front-end development styleguide with Sass, JavaScript and Handlebars.
Uses the [Gulp](http://gulpjs.com/) task runner to compile [Sass](http://sass-lang.com/) files, [lint](http://eslint.org/) and concatenate JavaScript and create static HTML from [Handlebars](http://handlebarsjs.com/).


## Contents
1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Usage](#usage)
  1. [Tasks](#tasks)
  2. [Sass](#sass)
  3. [JavaScript](#javascript)
  4. [Handlebars](#handlebars)
  5. [Images](#images)
4. [Styleguide CSS](#styleguide-css)
5. [Credits](#credits)


## Dependencies
* [Node.js with npm](https://nodejs.org/)
* Tested with Node.js Current. Older versions may work, but there is no guarantee.


## Installation
1. Get the [latest Front-End Styleguide release](https://github.com/MVSde/styleguide/releases/latest).
2. Run `npm install` to download Node Modules.
3. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.


*To update previously downloaded Node Modules run `npm update`.*


## Usage

### Tasks
These are the main Gulp tasks:
* Run `gulp` to start the default task. This task watches for file changes and starts Browsersync.  
All generated files are placed in `dev`.
* Run `gulp development` to start the default task without file watching and Browsersync.  
All generated files are placed in `dev`.
* Run `gulp production` to create prduction ready files. This task minifys CSS and JavaScript files and compresses images.  
All genereated files will be placed in `dist`.

There are more tasks available for standalone execution:
* `sass-dev` and `sass-dist` for Sass compilation.
* `js-dev` and `js-dist` for JavaScript concatenation and linting.
* `html-dev` and `html-dist` for static HTML file generation.
* `assets-dev` and `assets-dist` for assets copying and image minification.

*The generated folders `dev` and `dist` are not versioned by Git.*


### Sass
Located in `src/css`.  
Output to `dev/css` or `dist/css`.

*Sass* is a CSS-Preprocessor supporting variables, nesting and mixins - among many other features. For a complete documentation jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a far better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [Handlebars-Section](#handlebars) for the HTML-side of componentization.

The function `@import` includes the corresponding file in the main Sass file. The final output is one large CSS file to minimize requests. See `src/css/main.scss` for more information.

*The development task generates sourcemaps.*


### JavaScript
Located in `src/js`.  
Output to `dev/js` or `dist/js`.

JavaScript files are concatenated in the following order: first files from `libraries`, then files from `functions` and lastly files from `components`. Within these folders the order is alphabetical.

Files from `functions` and `components` are transpiled with [Babel](https://babeljs.io/) and the ES2015 preset. ESLint is configured for ES2015 aswell, see `gulpfile.js` for more configuration stuff.

All third-party stuff should be placed inside the folder `src/js/libraries`. ESLint ignores files in this folder to prevent error spamming.

*The development task runs ESLint and generates sourcemaps. The production task uglifies the source.*


### Handlebars
Located in `src/html`.  
Output to `dev` or `dist`.

*Handlebars* is an HTML templating engine based on JavaScript. Gulp creates static HTML from Handlebars files.

Hierarchy with subfolders is supported. The output reflects the input file tree.


#### Layouts
Layouts determine the overall structure of the HTML document. They contain the `<head>` area, scripts and styles.

Layouts are located in `src/html/partials/layouts`.

```html
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

Includes are located in `src/html/partials/includes`. The Handlebars renderer accesses them relative to the `src/html/partials` folder.

The syntax `{{> "includes/example" }}` includes the file `src/html/partials/includes/example.hbs`.


#### Pages and Components
Pages are prototypes for the final web pages.
Components are reference pages for smaller UI parts. The gulp task `production` will not render them.

The `default` gulp task injects a horizontal navigation bar into pages and components for fast file switching.

Pages are located in `src/html/pages`, components in `src/html/components`.

The YAML front matter between the opening `---` and closing `---` contains general information like the page title and description. This will be used primarily by layouts. You can add additional information (arrays and even objects), which can be accessed via `{{@file.meta.key}}`. Replace `key` with the variable name from the front matter.

```html
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

Components may use additional markup with containers for variations.

```html
{{#embed "styleguide/article" title="Some title" description="Some text" body-class="dark"}}
{{#content "body"}}
  <p>This creates a nicely formatted container with a title and description.</p>
{{/content}}
{{/embed}}
```

The following attributes are available:
* `title` sets a heading for the component variation
* `description` provides additional information
* `body-class` generates a class prefixed with `sg-article__body--` which can be styled in `sg.scss` (the classes `light` and `dark` are pre-configured to alter the background-color of the component frame)


### Images
Located in `src/img`.  
Output to `dev/img` or `dist/img`.

All files and folders placed in `src/img` will be copied to `dev/img` or `dist/img`.

SVG files placed in the `src/img/icons` folder will be transformed into an SVG icon sprite named `icons.svg`. The original icons will *not* be copied to the respective dev or dist folder.

Icons can be used within HTML with the following syntax:

```html
<svg><use xlink:href="{{rel}}img/icons.svg#icon"></svg>
```

If you have to support Internet Explorer, please use the [SVG for Everybody](https://github.com/jonathantneal/svg4everybody) polyfill.

*The production task minifies images with a lossless compressor.*


## Styleguide CSS
The components pages and the development menu use some styling. All styles are located in `src/html/css/sg.scss`.

*The style definitions located in `src/css` use the prefix `sg-` to ensure compatibility with the main stylesheet.*


## Credits

[Material icons by Google](https://design.google.com/icons/)
