'use strict';




/* NODE MODULES
 * ========================================================================== */


// Base
var glob         = require('glob');
var del          = require('del');
var path         = require('path');

// Gulp
var gulp         = require('gulp');

// Utilities
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var runSequence  = require('run-sequence');

// CSS/Sass
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// Handelbars
var hb           = require('gulp-hb');
var frontMatter  = require('gulp-front-matter');

// Images
var imagemin     = require('gulp-imagemin');

// BrowserSync
var browserSync  = require('browser-sync');




/* PATHS & CONFIGURATION
 * ========================================================================== */


// Base folders
var basePaths = {
  src:  'src/',
  dev:  'dev/',
  dist: 'dist/'
}


// Task specific folders
var paths = {
  // CSS
  css: {
    src:        basePaths.src  + 'css/',
    dev:        basePaths.dev  + 'css/',
    dist:       basePaths.dist + 'css/'
  },

  // JavaScript
  js: {
    src:        basePaths.src  + 'js/',
    dev:        basePaths.dev  + 'js/',
    dist:       basePaths.dist + 'js/'
  },

  // HTML
  html: {
    src:        basePaths.src  + 'html/',
    pages:      basePaths.src  + 'html/pages/',
    components: basePaths.src  + 'html/components/',
    partials:   basePaths.src  + 'html/partials/**/*.hbs',
    css:        basePaths.src  + 'html/css/',
    dev:        basePaths.dev,
    dist:       basePaths.dist
  },

  // Images
  img: {
    src:        basePaths.src  + 'img/',
    dev:        basePaths.dev  + 'img/',
    dist:       basePaths.dist + 'img/'
  }
}


// Config
var config = {
  // CSS
  css: {
    dev: {
      outputStyle: 'expanded'
    },
    dist: {
      outputStyle: 'compressed'
    },
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  },

  // HTML
  html: {
    hb: {
      bustCache: true
    },
    browserSync: {
      server: {
        baseDir: paths.html.dev
      },
      logPrefix: 'BrowserSync',
      scrollElements: ['*'],
      reloadDelay: 200
    }
  },

  // Images
  img: {
    imagemin: {
      progressive: true,
      interlaced: true,
      multipass: true
    }
  }
}




/* CLEAN
 * Delete directories
 * ========================================================================== */


// Clean Development
gulp.task('clean-dev', function() {
  return del(basePaths.dev);
});


// Clean Distribution
gulp.task('clean-dist', function() {
  return del(basePaths.dist);
});


// Clean Dev HTML
gulp.task('clean-html-dev', function() {
  return del(paths.html.dev + '**/*.html');
});


// Clean Dev Images
gulp.task('clean-img-dev', function() {
  return del(paths.img.dev + '**');
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// CSS Development
gulp.task('css-dev', function() {
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass(config.css.dev).on('error', sass.logError))
      .pipe(autoprefixer(config.css.autoprefixer))
      .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dev))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


// CSS Watch
gulp.task('css-watch', ['css-dev']);


// CSS Styleguide
gulp.task('css-sg', function() {
  return gulp.src(paths.html.css + 'sg.scss')
    .pipe(sass(config.css.dev).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(gulp.dest(paths.css.dev));
});


// CSS Distribution
gulp.task('css-dist', ['clean-dist'], function() {
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sass(config.css.dist).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.css.dist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// JavaScript Hint
gulp.task('js-hint', function() {
  return gulp.src([paths.js.src + '**/*.js', '!' + paths.js.src + 'libraries/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// JavaScript Concatenation
gulp.task('js-concat', function() {
  return gulp.src([paths.js.src + 'libraries/**/*.js', paths.js.src + 'components/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dev))
    .pipe(browserSync.stream({match: '**/*.js'}));
});


// JavaScript Development
gulp.task('js-dev', ['js-hint', 'js-concat']);


// JavaScript Watch
gulp.task('js-watch', ['js-dev']);


// JavaScript Production
gulp.task('js-dist', ['clean-dist'], function() {
  return gulp.src([paths.js.src + 'libraries/**/*.js', paths.js.src + 'components/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});




/* HTML
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


// Search string in array and replace
var replaceInArray = function(array, searchFor, replaceWith) {
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].replace(searchFor, replaceWith);
  }
};


// Handle Handlebars error
var onErrorHandler = function(error) {
  console.log(gutil.colors.red('Handlebars error'));
  console.log('File: ' + gutil.colors.underline(error.fileName));
  console.log('Message: ' + error.message + '\n');
};


// Handlebars Function
var compileHandlebars = function(source, destination, nav) {
  var pageList      = glob.sync(paths.html.pages      + '**/*.hbs');
  var componentList = glob.sync(paths.html.components + '**/*.hbs');

  replaceInArray(pageList, '.hbs', '.html');
  replaceInArray(pageList, paths.html.pages, '');

  replaceInArray(componentList, '.hbs', '.html');
  replaceInArray(componentList, paths.html.components, '');

  var pages      = [];
  var components = [];

  for (var i = 0, item; item = pageList[i++];) {
    pages.push({title: item, href: item});
  }

  for (var i = 0, item; item = componentList[i++];) {
    components.push({title: item, href: 'components/' + item});
  }

  var hbStream = hb(config.html.hb)
    .partials(paths.html.partials)
    .helpers(require('handlebars-layouts'))
    .helpers({
      rel: function(options) {
        var currentPath = path.dirname(options.data.file.path);
        var sourcePath  = path.resolve(source);

        var additionalPath = '';

        if (source === paths.html.components) {
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
      navItems: {
        pages: pages,
        components: components
      }
    });

  return gulp.src(source + '**/*.hbs')
    .pipe(frontMatter({property: 'meta'}))
    .pipe(hbStream.on('error', onErrorHandler))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(destination));
};


// HTML Development
gulp.task('html-dev', ['clean-html-dev'], function() {
  compileHandlebars(paths.html.pages, paths.html.dev, true);
  compileHandlebars(paths.html.components, paths.html.dev + 'components', true);
});


// HTML Watch
gulp.task('html-watch', ['html-dev'], browserSync.reload);


// HTML Production
gulp.task('html-dist', ['clean-dist'], function() {
  compileHandlebars(paths.html.pages + '**/*.hbs', paths.html.dist, false);
});




/* Images
 * Copy images and compress production files
 * ========================================================================== */


// Images Development
gulp.task('img-dev', ['clean-img-dev'], function() {
  return gulp.src(paths.img.src + '**')
    .pipe(gulp.dest(paths.img.dev));
});


// Images Watch
gulp.task('img-watch', ['img-dev'], browserSync.reload);


// Images Distribution
gulp.task('img-dist', ['clean-dist'], function() {
  return gulp.src(paths.img.src + '**')
    .pipe(imagemin(config.img.imagemin))
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
 * Run all *:dev tasks and watch for add/change/delete.
 * ========================================================================== */


gulp.task('browsersync', function() {
  browserSync(config.html.browserSync);
});


gulp.task('default', ['clean-dev'], function() {
  // Log messages
  var onChangeHandler = function(event) {
    console.log('\n');
    gutil.log(gutil.colors.blue(event.path) + ' ' + event.type);
  }

  // Run initial task queue
  runSequence(['css-dev', 'css-sg', 'js-dev', 'html-dev', 'img-dev'], 'browsersync');

  // Watch CSS
  var watchCSS = gulp.watch(paths.css.src + '**/*.scss', ['css-watch']);
  watchCSS.on('change', onChangeHandler);

  // Watch JavaScript
  var watchJS = gulp.watch(paths.js.src + '**/*.js', ['js-watch']);
  watchJS.on('change', onChangeHandler);

  // Watch HTML
  var watchHTML = gulp.watch(paths.html.src + '**/*.hbs', ['html-watch']);
  watchHTML.on('change', onChangeHandler);

  // Watch Images
  var watchImg = gulp.watch(paths.img.src + '**/*', ['img-watch']);
  watchImg.on('change', onChangeHandler);
});
