'use strict'


/* NODE MODULES
 * ========================================================================== */


// Base
var fs           = require('fs');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var watchr       = require('watchr');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');

// CSS/Sass
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// Assemble
var assemble     = require('assemble');
var gulpAssemble = require('gulp-assemble');

// Assets
var imagemin     = require('gulp-imagemin');




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
  sassWatch:   path.src  + 'css',
  sassDev:     path.dev  + 'css',
  sassDist:    path.dist + 'css',

  // JavaScript
  jsInput:     path.src  + 'js/**/*.js',
  jsWatch:     path.src  + 'js',
  jsDev:       path.dev  + 'js',
  jsDist:      path.dist + 'js',

  // HTML
  htmlPages:   path.src  + 'html/pages/*.hbs',
  htmlComps:   path.src  + 'html/components/*.hbs',
  htmlLayouts: path.src  + 'html/layouts/*.hbs',
  htmlIncls:   path.src  + 'html/includes/**/*.hbs',
  htmlWatch:   path.src  + 'html',
  htmlDev:     path.dev,
  htmlDist:    path.dist,

  // Assets
  assetsInput: [path.src + 'assets/**/*', '!' + path.src + 'assets/**/.gitkeep'],
  assetsWatch: path.src  + 'assets',
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


// Clean HTML
gulp.task('clean:html', function() {
  return del(config.htmlDev + '/*.html');
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
    .pipe(browserSync.stream());
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
    .pipe(gulp.dest(config.jsDev))
    .pipe(browserSync.stream());
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




/* ASSEMBLE
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


// Assemble Development
gulp.task('assemble:dev', ['clean:html'], function() {
  // Set up Layouts and Partials
  assemble.layouts(config.htmlLayouts);
  assemble.partials(config.htmlIncls);

  return gulp.src([config.htmlPages, config.htmlComps])
    .pipe(gulpAssemble(assemble))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(config.htmlDev))
    .pipe(browserSync.stream());
});


// Assemble Distribution
gulp.task('assemble:dist', ['clean:dist'], function() {
  // Set up Layouts and Partials
  assemble.layouts(config.htmlLayouts);
  assemble.partials(config.htmlIncls);

  return assemble.src(config.htmlPages)
    .pipe(rename({extname: '.html'}))
    .pipe(assemble.dest(config.htmlDist));
});




/* ASSETS
 * Copy assets (e.g. img or fonts)
 * ========================================================================== */


// Assets Development
gulp.task('assets:dev', ['clean:assets'], function() {
  return gulp.src(config.assetsInput)
    .pipe(gulp.dest(config.assetsDev))
    .pipe(browserSync.reload({stream: true}));
});


// Assets Distribution
gulp.task('assets:dist', ['clean:dist'], function() {
  return gulp.src(config.assetsInput)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest(config.assetsDist));
});




/* DISTRIBUTION
 * Run alle the *:dist tasks
 * ========================================================================== */


gulp.task('distribution', ['sass:dist', 'js:dist', 'assemble:dist', 'assets:dist']);




/* BROWSERSYNC
 * Open web server for cross device development
 * and auto-reload of CSS/JS/HTML
 * ========================================================================== */


gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: config.htmlDev
    },
    logPrefix: 'BrowserSync',
    scrollElements: ['*']
  });
});




/* DEFAULT
 * Run all *:dev tasks and watch for add/change/delete
 *
 * Until gulp.watch becomes somewhat useful we utilize Watchr:
 * (https://github.com/bevry/watchr)
 * ========================================================================== */


// Capitalize first string letter
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


gulp.task('default', ['sass:dev', 'js:dev', 'assemble:dev', 'assets:dev'], function() {

  // Start BrowserSync after initial tasks finished
  gulp.start('browserSync');

  // Watch Sass
  watchr.watch({
    paths: [config.sassWatch],
    catchupDelay: 500,
    listeners: {
      error: function(err) {
        gutil.log('An error occured: '.red, err)
      },
      change: function(changeType, filePath) {
        console.log('');
        gutil.log(capitalize(changeType), gutil.colors.magenta(filePath));
        gulp.start('sass:dev');
      }
    }
  });

  // Watch JavaScript
  watchr.watch({
    paths: [config.jsWatch],
    catchupDelay: 500,
    listeners: {
      error: function(err) {
        gutil.log('An error occured: '.red, err)
      },
      change: function(changeType, filePath) {
        console.log('');
        gutil.log(capitalize(changeType), gutil.colors.magenta(filePath));
        gulp.start('js:dev');
      }
    }
  });

  // Watch HTML
  watchr.watch({
    paths: [config.htmlWatch],
    catchupDelay: 500,
    listeners: {
      error: function(err) {
        gutil.log('An error occured: '.red, err)
      },
      change: function(changeType, filePath) {
        console.log('');
        gutil.log(capitalize(changeType), gutil.colors.magenta(filePath));
        gulp.start('assemble:dev');
      }
    }
  });

  // Watch Assets
  watchr.watch({
    paths: [config.assetsWatch],
    catchupDelay: 500,
    listeners: {
      error: function(err) {
        gutil.log('An error occured: '.red, err)
      },
      change: function(changeType, filePath) {
        console.log('');
        gutil.log(capitalize(changeType), gutil.colors.magenta(filePath));
        gulp.start('assets:dev');
      }
    }
  });
});
