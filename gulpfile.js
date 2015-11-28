'use strict'


/* NODE MODULES
============================================================================= */


// Base
var del          = require('del');
var gulp         = require('gulp');
var rename       = require('gulp-rename');

// CSS/Sass
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');




/* CONFIGURATION
============================================================================= */


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
  jsInput:     path.src  + 'js/main.js',
  jsWatch:     path.src  + 'js/**/*.js',
  jsDev:       path.dev  + 'js',
  jsDist:      path.dist + 'js',

  // Assets
  assetsInput: path.src  + 'assets',
  assestWatch: path.src  + 'assets/**/*',
  assetsDev:   path.dev  + 'assets',
  assetsDist:  path.dist + 'assets'
}




/* CLEAN
============================================================================= */

// Clean Development
gulp.task('clean:dev', function() {
  return del(path.dev);
});


// Clean Distribution
gulp.task('clean:dist', function() {
  return del(path.dist);
});
