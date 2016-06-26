# Front-End Styleguide
Front-end development styleguide with Sass, JavaScript and Handlebars.
Uses the [Gulp](http://gulpjs.com/) task runner to compile [Sass](http://sass-lang.com/) files, [lint](http://eslint.org/) and [transpile](https://babeljs.io/) JavaScript and create static HTML from [Handlebars](http://handlebarsjs.com/) templates.


## Contents
1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Usage](#usage)
  1. [Tasks](#tasks)
  2. [CSS](#css)
  3. [JavaScript](#javascript)
  4. [HTML](#html)
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

*Sass* is a CSS-Preprocessor supporting variables, nesting and mixins - among many other features. For a quick start jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a far better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [HTML-Section](#html) for the HTML-side of componentization.

The function `@import` includes the corresponding file in the main Sass file. The final output is one large CSS file to minimize browser requests. See `src/css/main.scss` for more information.

*The development task generates sourcemaps.*


### JavaScript
Located in `src/js`.  
Output to `dev/js` or `dist/js`.

JavaScript files are concatenated in the following order: First files from `libraries`, then files from `functions` and lastly files from `components`. Within these folders the order is alphabetical.

Files from `functions` and `components` are transpiled with [Babel](https://babeljs.io/) and the ES2015 preset. ESLint is configured for ES2015 aswell, see `gulp/config.js` for more configuration options.

All third-party stuff should be placed inside the folder `src/js/libraries`. ESLint ignores files in this folder to prevent error spamming.

*The development task runs ESLint and generates sourcemaps. The production task uglifies the source.*


### HTML
Located in `src/html`.  
Output to `dev` or `dist`.

*Handlebars* is an HTML templating engine based on JavaScript. Gulp creates static HTML from Handlebars files.

Hierarchy with subfolders is supported. The output reflects the input file tree.


#### Layouts
Layouts determine the overall structure of the HTML document. They contain the `<head>` area, scripts and styles.

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


#### Partials
These files can be included in all other files (even in other partials). The process is comparable to PHP's `include`.

Partials are located in `src/html/partials`.

The syntax `{{> "includes/example" }}` includes the file `src/html/partials/includes/example.hbs`.


#### Components and Pages
Components are reference pages for smaller UI parts. The gulp task `production` will not render them. Pages are prototypes for the final web pages.

The `default` gulp task injects a horizontal navigation bar into components and pages HTML files for faster file switching.

components in `src/html/components`, pages are located in `src/html/pages`.

The YAML front matter between the opening `---` and closing `---` contains general information like the page title and description. These will be used primarily by layouts. Add additional information (e.g. arrays or even objects), which can be accessed via `{{@file.meta.key}}`. Replace `key` with the variable name from the front matter.

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

Use the [SVG for Everybody](https://github.com/jonathantneal/svg4everybody) polyfill to support Internet Explorer.

*The production task minifies images with a lossless compressor.*


## Styleguide CSS
The components HTML files and the development menu use some styling. All styles are located in `src/html/css/sg.scss`.

*The style definitions located in `src/css` use the prefix `sg-` to ensure compatibility with the main stylesheet.*


## Credits

[Material icons by Google](https://design.google.com/icons/)
