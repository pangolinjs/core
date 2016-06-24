'use strict';



/* MODULES
 * ========================================================================== */


// Base
const fs           = require('fs');
const glob         = require('glob');
const del          = require('del');
const path         = require('path');
const browsersync  = require('browser-sync');

// Gulp
const gulp         = require('gulp');

// Utilities
const gutil        = require('gulp-util');
const filter       = require('gulp-filter');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const runSequence  = require('run-sequence');

// CSS/Sass
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// JavaScript
const babel        = require('gulp-babel');
const uglify       = require('gulp-uglify');
const eslint       = require('gulp-eslint');

// Handelbars
const hb           = require('gulp-hb');
const fm           = require('front-matter');
const gulpFm       = require('gulp-front-matter');

// Images
const imagemin     = require('gulp-imagemin');

// Paths & Config
const paths        = require('./gulp/paths.js');
const config       = require('./gulp/config.js');




/* CLEAN
 * Delete directories
 * ========================================================================== */


// Clean Development
gulp.task('clean-dev', function() {
  return del(paths.dev);
});


// Clean Distribution
gulp.task('clean-dist', function() {
  return del(paths.dist);
});


// Clean Dev HTML
gulp.task('clean-html-dev', function() {
  return del(`${paths.html.dev}/**/*.html`);
});


// Clean Dev Images
gulp.task('clean-img-dev', function() {
  return del(`${paths.img.dev}/**`);
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// CSS Development
gulp.task('css-dev', function() {
  return gulp.src(paths.css.src + '/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass(config.css.dev).on('error', sass.logError))
      .pipe(autoprefixer(config.css.autoprefixer))
      .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dev))
    .pipe(browsersync.stream({match: '**/*.css'}));
});


// CSS Watch
gulp.task('css-watch', ['css-dev']);


// CSS Styleguide
gulp.task('css-sg', function() {
  return gulp.src(paths.html.src + '/css/sg.scss')
    .pipe(sass(config.css.dev).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(gulp.dest(paths.css.dev));
});


// CSS Distribution
gulp.task('css-dist', ['clean-dist'], function() {
  return gulp.src(paths.css.src + '/**/*.scss')
    .pipe(sass(config.css.dist).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.css.dist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// Handle Bable error
var babelError = function(error) {
  console.log(
    '\n' + gutil.colors.underline(error.fileName) + '\n'
    + gutil.colors.gray('  line ' + error.loc.line + '  col ' + error.loc.column)
    + '  ' + gutil.colors.red('Babel error: ')
    + gutil.colors.blue(error.message.replace(error.fileName + ': ', '')) + '\n\n'
    + error.codeFrame + '\n'
  );
  this.emit('end');
};

var babelExclude = filter([
  paths.js.src + '/functions/**/*.js',
  paths.js.src + '/components/**/*.js'
], {restore: true});


// JavaScript Lint
gulp.task('js-lint', function() {
  return gulp.src([paths.js.src + '/functions/**/*.js', paths.js.src + '/components/**/*.js'])
    .pipe(eslint(config.js.eslint))
    .pipe(eslint.format());
});


// JavaScript Concatenation
gulp.task('js-process', function() {
  return gulp.src([
    paths.js.src + '/libraries/**/*.js',
    paths.js.src + '/functions/**/*.js',
    paths.js.src + '/components/**/*.js'
  ])
    .pipe(sourcemaps.init())
      .pipe(babelExclude)
        .pipe(concat('scripts.js')) // Let Babel work on the concatenated files
        .pipe(babel(config.js.babel).on('error', babelError))
      .pipe(babelExclude.restore)
      .pipe(concat('scripts.js')) // Add libraries files
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dev))
    .pipe(browsersync.stream({match: '**/*.js'}));
});


// JavaScript Development
gulp.task('js-dev', ['js-lint', 'js-process']);


// JavaScript Watch
gulp.task('js-watch', ['js-dev']);


// JavaScript Production
gulp.task('js-dist', ['clean-dist'], function() {
  return gulp.src([
    paths.js.src + '/libraries/**/*.js',
    paths.js.src + '/functions/**/*.js',
    paths.js.src + '/components/**/*.js'
  ])
    .pipe(babelExclude)
      .pipe(concat('scripts.js')) // Let Babel work on the concatenated files
      .pipe(babel(config.js.babel))
    .pipe(babelExclude.restore)
    .pipe(concat('scripts.js')) // Add libraries files
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});




/* HTML
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


// Handle Handlebars error
var handlebarsError = function(error) {
  console.log(
    '\n' + gutil.colors.underline(error.fileName) + '\n'
    + '  ' + gutil.colors.red('Handlebars error: ')
    + gutil.colors.blue(error.message.replace(error.fileName + ': ', '')) + '\n'
  );
  this.emit('end');
};


// Handlebars Function
var compileHandlebars = function(source, destination, nav) {
  var pages      = [];
  var components = [];

  if (nav) {
    var pageList      = glob.sync(paths.html.src + '/pages/**/*.hbs');
    var componentList = glob.sync(paths.html.src + '/components/**/*.hbs');

    for (var page of pageList) {
      var title = fm(fs.readFileSync(page, 'utf8')).attributes.title;
      var href  = path.relative(paths.html.src + '/pages', page).replace('.hbs', '.html');

      if (!title) {
        title = '(No Title)';
      }

      pages.push({title, href});
    }

    for (var component of componentList) {
      var title = fm(fs.readFileSync(component, 'utf8')).attributes.title;
      var href  = 'components/' + path.relative(paths.html.src + '/components', component).replace('.hbs', '.html');

      if (!title) {
        title = '(No Title)';
      }

      components.push({title, href});
    }
  }

  var hbStream = hb(config.html.hb)
    .partials(paths.html.src + '/partials/**/*.hbs')
    .helpers(require('handlebars-layouts'))
    .helpers({
      rel: function(options) {
        var currentPath = path.dirname(options.data.file.path);
        var sourcePath  = path.resolve(source);

        var additionalPath = '';

        if (source === paths.html.src + '/components') {
          additionalPath = '../'
        }

        if (currentPath === sourcePath) {
          return additionalPath;
        }

        return additionalPath + path.relative(currentPath, sourcePath) + '/';
      }
    })
    .data({
      displayNav: nav,
      navItems: {pages, components}
    });

  return gulp.src(source + '/**/*.hbs')
    .pipe(gulpFm({property: 'meta'}))
    .pipe(hbStream.on('error', handlebarsError))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(destination));
};


// HTML Development
gulp.task('html-dev', ['clean-html-dev'], function() {
  compileHandlebars(paths.html.src + '/pages', paths.html.dev, true);
  compileHandlebars(paths.html.src + '/components', paths.html.dev + '/components', true);
});


// HTML Watch
gulp.task('html-watch', ['html-dev'], browsersync.reload);


// HTML Production
gulp.task('html-dist', ['clean-dist'], function() {
  compileHandlebars(paths.html.src + '/pages', paths.html.dist, false);
});




/* Images
 * Copy images and compress production files
 * ========================================================================== */


// Images Development
gulp.task('img-dev', ['clean-img-dev'], function() {
  return gulp.src(paths.img.src + '/**')
    .pipe(gulp.dest(paths.img.dev));
});


// Images Watch
gulp.task('img-watch', ['img-dev'], browsersync.reload);


// Images Distribution
gulp.task('img-dist', ['clean-dist'], function() {
  return gulp.src(paths.img.src + '/**')
    .pipe(imagemin([
      imagemin.jpegtran(config.img.imagemin.jpg),
      imagemin.optipng(config.img.imagemin.png),
      imagemin.svgo(config.img.imagemin.svg)
    ]))
    .pipe(gulp.dest(paths.img.dist));
});




/* Development
 * Generate development files.
 * ========================================================================== */


gulp.task('development', ['css-dev', 'js-dev', 'html-dev', 'img-dev']);




/* Production
 * Generate production ready files.
 * ========================================================================== */


gulp.task('production', ['css-dist', 'js-dist', 'html-dist', 'img-dist']);




/* DEFAULT
 * Run all dev tasks and watch for changes.
 * ========================================================================== */


gulp.task('browsersync', function() {
  browsersync(config.html.browsersync);
});


gulp.task('default', ['clean-dev'], function() {
  var onChangeMessage = function(event) {
    console.log('\n');
    gutil.log(gutil.colors.blue(event.path) + ' ' + event.type);
  }

  // Run initial task queue
  runSequence(['css-dev', 'css-sg', 'js-dev', 'html-dev', 'img-dev'], 'browsersync');

  // Watch CSS
  var watchCSS = gulp.watch(paths.css.src + '/**/*.scss', ['css-watch']);
  watchCSS.on('change', onChangeMessage);

  // Watch JavaScript
  var watchJS = gulp.watch(paths.js.src + '/**/*.js', ['js-watch']);
  watchJS.on('change', onChangeMessage);

  // Watch HTML
  var watchHTML = gulp.watch(paths.html.src + '/**/*.hbs', ['html-watch']);
  watchHTML.on('change', onChangeMessage);

  // Watch Images
  var watchImg = gulp.watch(paths.img.src + '/**/*', ['img-watch']);
  watchImg.on('change', onChangeMessage);
});
