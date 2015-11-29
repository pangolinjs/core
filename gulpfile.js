'use strict'


/* NODE MODULES
 * ========================================================================== */


// Base
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var watch        = require('gulp-watch');
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


// Clean Assets
gulp.task('clean:assets', function() {
  return del(config.assetsDev);
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// Sass Development
gulp.task('sass:dev', function() {
  gulp.src(config.sassInput)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sassDev))
});


// Sass Distribution
gulp.task('sass:dist', ['clean:dist'], function() {
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
gulp.task('js:dist', ['clean:dist'], function() {
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


// Assets Development
gulp.task('assets:dev', ['clean:assets'], function() {
  return gulp.src(config.assetsInput)
    .pipe(gulp.dest(config.assetsDev));
});


// Assets Distribution
gulp.task('assets:dist', ['clean:dist'], function() {
  return gulp.src(config.assetsInput)
    .pipe(gulp.dest(config.assetsDist));
});




/* DISTRIBUTION
 * Run alle the *:dist tasks
 * ========================================================================== */


gulp.task('distribution', ['sass:dist', 'js:dist', 'assets:dist']);




/* DEFAULT
 * Run alle the *:dev tasks and watch
 * Outputs fancy messages to console
 * ========================================================================== */


gulp.task('default', ['sass:dev', 'js:dev', 'assets:dev'], function() {
  // Watch Sass
  watch(config.sassWatch, function(event) {
    console.log('\n');
    gutil.log(event.path.magenta);
    gulp.start('sass:dev');
  });

  // Watch Javascript
  watch(config.jsWatch, function(event) {
    console.log('\n');
    gutil.log(event.path.magenta);
    gulp.start('js:dev');
  });

  // Watch Assets
  watch(config.assetsWatch, function(event) {
    console.log('\n');
    gutil.log(event.path.magenta);
    gulp.start('assets:dev');
  });
});
