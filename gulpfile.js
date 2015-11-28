'use strict'


/* NODE MODULES
 * ========================================================================== */


// Base
var del          = require('del');
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var colors       = require('colors');

// CSS/Sass
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');




/* CONFIGURATION
 * ========================================================================== */


// Directories
var path = {
  src:  'src/',
  dev:  'dev/',
  dist: 'dist/'
}


// Variables
var config = {
  // Sass
  sassInput:   path.src  + 'css/main.scss',
  sassWatch:   path.src  + 'css/**/*.scss',
  sassDev:     path.dev  + 'css',
  sassDist:    path.dist + 'css',

  // JavaScript
  jsInput:     path.src  + 'js/**/*.js',
  jsWatch:     path.src  + 'js/**/*.js',
  jsDev:       path.dev  + 'js',
  jsDist:      path.dist + 'js',

  // Assets
  assetsInput: path.src  + 'assets/**/*',
  assetsWatch: path.src  + 'assets/**/*.*',
  assetsDev:   path.dev  + 'assets',
  assetsDist:  path.dist + 'assets'
}




/* CLEAN
 * Delete directories
 * ========================================================================== */

// Clean Development
gulp.task('clean:dev', function() {
  return del(path.dev);
});


// Clean Distribution
gulp.task('clean:dist', function() {
  return del(path.dist);
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// Sass Development
gulp.task('sass:dev', function() {
  return gulp.src(config.sassInput)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sassDev));
});


// Sass Distribution
gulp.task('sass:dist', function() {
  return gulp.src(config.sassInput)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(config.sassDist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// JavaScript Development
gulp.task('js:dev', function() {
  return gulp.src(config.jsInput)
    .pipe(sourcemaps.init())
      .pipe(concat('script.js'))
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.jsDev));
});


// JavaScript Production
gulp.task('js:dist', function() {
  return gulp.src(config.jsInput)
    .pipe(concat('script.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDist));
});




/* ASSETS
 * Copy assets (e.g. img or fonts)
 * ========================================================================== */


// Remove Assets folder
gulp.task('assets:clean', function() {
  return del(config.assetsDev);
});


// Assets Development
gulp.task('assets:dev', ['assets:clean'], function() {
  return gulp.src(config.assetsInput)
    .pipe(gulp.dest(config.assetsDev));
});


// Assets Distribution
gulp.task('assets:dist', function() {
  return gulp.src(config.assetsInput)
    .pipe(gulp.dest(config.assetsDist));
});




/* DISTRIBUTION
 * Run alle the *:dist tasks
 * ========================================================================== */


gulp.task('distribution', ['clean:dist'], function() {
  gulp.run('sass:dist');
});




/* DEFAULT
 * Run alle the *:dev tasks and watch
 * ========================================================================== */


gulp.task('default', ['sass:dev', 'js:dev', 'assets:dev'], function() {
  var watchSass   = gulp.watch(config.sassWatch, ['sass:dev']);
  var watchJS     = gulp.watch(config.jsWatch, ['js:dev']);
  var watchAssets = gulp.watch(config.assetsWatch, ['assets:dev']);

  /**
   * Return the current time with fancy formatting
   */
  var outputTime = function() {
    var date = new Date();
    var time = ('0' + date.getUTCHours()).slice(-2) + ':' +
               ('0' + date.getUTCMinutes()).slice(-2) + ':' +
               ('0' + date.getUTCSeconds()).slice(-2);

    return '\n[' + time.gray + '] ';
  };

  /**
   * Return a message based on input
   */
  var outputMsg = function(event) {
    return 'File ' + event.path.magenta + ' was ' + event.type;
  };

  // Sass Notification
  watchSass.on('change', function(e) {
    console.log(outputTime() + outputMsg(e));
  });

  // JS Notification
  watchJS.on('change', function(e) {
    console.log(outputTime() + outputMsg(e));
  });

  // Assets Notification
  watchAssets.on('change', function(e) {
    console.log(outputTime() + outputMsg(e));
  });
});
