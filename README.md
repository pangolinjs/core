# Front-End Styleguide
Front-end development styleguide with Sass, JavaScript and Nunjucks.
Uses the [Gulp](http://gulpjs.com/) task runner to compile [Sass](http://sass-lang.com/) files, [lint JavaScript](http://jshint.com/) and create static HTML files from [Nunjucks](https://mozilla.github.io/nunjucks/) files.


## Contents
1. [Dependencies](#dependencies)
2. [Installation](#installation)
3. [Usage](#usage)
  1. [Sass](#sass)
  2. [JavaScript](#javascript)
  3. [Nunjucks](#nunjucks)


## Dependencies
* [Node.js with npm](https://nodejs.org/)


## Installation
1. Get the [latest release](https://github.com/MVSde/styleguide/releases/latest).
2. Run `npm install` to download Node Modules.
3. Install global Gulp with `npm install -g gulp`. This step is required to get CLI access to gulp.


## Usage
* Run `gulp` to start the default task. This task watches for file changes. All generated files are placed in `dev`.
* Run `gulp distribution` to create prduction ready resources. This task minifys CSS and JavaScript files and compresses images. All genereated files will be placed in `dist`.

The generated folders `dev` and `dist` are not included with Git.


### Sass
Located in `src/css`.<br>
Output to `dev/css` or `dist/css`.

*Sass* is a CSS-Preprocessor supporting variables, nesting and mixins - among many other features.
For a complete documentation jump to the [Sass Basics](http://sass-lang.com/guide).

This styleguide splits the CSS into small parts. This ensures a far better organization of style declarations. Each component sits in it's own file and is re-usable across the project. See [Nunjucks-Section](#nunjucks) for detailed information about componentization.

The function `@import` concatenates all Sass files into one large stylesheet. See `src/css/main.scss` for more information.


### JavaScript
Located in `src/js`.<br>
Output to `dev/js` or `dist/js`.

Documentation following.


### Nunjucks
Located in `src/html`.<br>
Output to `dev` or `dist`.

*Nunjucks* is an HTML templating engine for JavaScript. Gulp creates static HTML files from Nunjucks files.

#### Templates
Templates determine the overall structure of the HTML document. They contain the `<head>` area, scripts and styles.

Templates are located in `src/html/templates`.

A basic template contains `{{ page_title }}` to render a title and `{% block page_body %} {% endblock %}` to render the actual content.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page_title }}</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>

    {% block page_body %} {% endblock %}

    <script src="js/script.js"></script>
  </body>
</html>
```

#### Includes
These files can be included in all other files (even in other includes). The process is comparable to PHP's *include*.

Includes are located in `src/html/templates/includes`. They can be organized in sub-folders.<br>
The Nunjucks renderer accesses them relative to the `templates` folder.

The syntax `{% include "includes/example.nunjucks" %}` includes the file `example.nunjucks`.

#### Pages and Components
Pages are the actual web pages displayed by the browser.<br>
Components are reference pages for smaller UI parts. The gulp task `production` will not render them.<br>
The `default` gulp task injects a flyout menu into pages and components for easier navigation during development.

Pages are located in `src/html/pages`, components in `src/html/components`.

To use a template you have to use `{% set page_title = "Title" %}` to set a title and `{% extends "template.nunjucks" %}` to define the template.

The content has to be enclosed by `{% block page_body %}` and `{% endblock %}`. This tells the renderer what to inject into the template body.

```html
{% set page_title = "Title" %}
{% extends "template.nunjucks" %}

{% block page_body %}
<p>This content will be injected into the template</p>
{% endblock %}
```

#### CSS
The components pages and the development menu use some styling.

This is located in `src/html/css/main.scss`.

The style definitions do not interfere with your CSS located in `src/css` as long as the following classes are not used:

<small>*These classes are subject to change and will be prefixed anytime soon(ish).*</small>

* docs__header
* docs__title
* docs__description
* docs__body
* docs__article
  * docs\__article__header
  * docs\__article__title
  * docs\__article__description
  * docs\__article__body
