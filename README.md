<p align="center">
  <img width="450" height="50" src="https://raw.githubusercontent.com/mvsde/styleguide/master/src/assets/img/styleguide-logo.png">
</p>

# Front-End Styleguide
Front-end development styleguide with Sass, JavaScript and Handlebars.
Uses the [Gulp](http://gulpjs.com/) task runner to compile [Sass](http://sass-lang.com/) files, [lint JavaScript](http://jshint.com/) and create static HTML files from [Handlebars](http://handlebarsjs.com/) files.


## Contents
1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Usage](#usage)
  1. [Sass](#sass)
  2. [JavaScript](#javascript)
  3. [Handlebars](#handlebars)
  4. [Assets](#assets)


## Dependencies
* [Node.js with npm](https://nodejs.org/)


## Installation
1. Get the [latest release](https://github.com/MVSde/styleguide/releases/latest).
2. Run `npm install` to download Node Modules.
3. To update previously downloaded Node Modules run `npm update`.
4. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.


## Usage
* Run `gulp` to start the default task. This task watches for file changes. All generated files are placed in `dev`.
* Run `gulp distribution` to create prduction ready resources. This task minifys CSS and JavaScript files and compresses images. All genereated files will be placed in `dist`.

The generated folders `dev` and `dist` are not included with Git.


### Sass
Located in `src/css`.<br>
Output to `dev/css` or `dist/css`.

*Sass* is a CSS-Preprocessor supporting variables, nesting and mixins - among many other features.
For a complete documentation jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a far better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [Handlebars-Section](#handlebars) for the HTML-side of componentization.

The function `@import` concatenates all Sass files into one large stylesheet. See `src/css/main.scss` for more information.


### JavaScript
Located in `src/js`.<br>
Output to `dev/js` or `dist/js`.

All JavaScript files will be concatenated so you can split the code into smaller components.


### Handlebars
Located in `src/html`.<br>
Output to `dev` or `dist`.

*Handlebars* is an HTML templating engine based on JavaScript. Gulp creates static HTML files from Handlebars files.

#### Layouts
Layouts determine the overall structure of the HTML document. They contain the `<head>` area, scripts and styles.

Layouts are located in `src/html/partials/layouts`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{file.meta.title}}</title>
  </head>
  <body>
    {{{block "content"}}}
  </body>
</html>
```

#### Includes
These files can be included in all other files (even in other includes). The process is comparable to PHP's *include*.

Includes are located in `src/html/partials/includes`. The Handlebars renderer accesses them relative to the `partials` folder.

The syntax `{{> "includes/example" }}` includes the file `src/html/partials/includes/example.hbs`.

#### Pages and Components
Pages are the actual web pages displayed by the browser.<br>
Components are reference pages for smaller UI parts. The gulp task `production` will not render them.<br>
The `default` gulp task injects a flyout menu into pages and components for easier navigation during development.

Pages are located in `src/html/pages`, components in `src/html/components`.

The YAML front matter between `---` contains general information like the page title and description. This will be used primarily by layouts.

```html
---
title: Example
description: Only used for components.
---
{{#extend "layouts/components"}}
  {{#content "content"}}
    <p>This will be injected into the layout.</p>
  {{/content}}
{{/extend}}
```

#### Styleguide CSS
The components pages and the development menu use some styling.

All styles are located in `src/html/css/docs.scss`.

The style definitions do not interfere with your CSS located in `src/css` as long as the following selectors are not used:<br>

* .sg-nav
* .sg-nav--open
  * .sg-nav__btn
    * .sg-nav__icon
  * .sg-nav__list
    * .sg-nav__title
    * .sg-nav__link
* .sg-header
  * .sg-header__title
  * .sg-header__description
* .sg-body
* .sg-article
  * .sg-article__header
    * .sg-article__title
    * .sg-article__description
  * .sg-article__body


### Assets
Located in `src/assets`.<br>
Output to `dev/assets` or `dist/assets`.

All files and folders placed in `src/assets` will be copied to `dev/assets` or `dist/assets`. The distribution task compresses images.
