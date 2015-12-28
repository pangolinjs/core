'use strict'


/* NODE MODULES
 * ========================================================================== */


// Base
var fs           = require('fs');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var watch        = require('gulp-watch');
var rename       = require('gulp-rename');
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

// Handelbars
var hb           = require('gulp-hb');
var hbLayouts    = 'node_modules/handlebars-layouts/index.js';
var frontMatter  = require('gulp-front-matter');

// Assets
var imagemin     = require('gulp-imagemin');




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
  css: {
    src:        basePaths.src  + 'css/',
    dev:        basePaths.dev  + 'css/',
    dist:       basePaths.dist + 'css/'
  },
  js: {
    src:        basePaths.src  + 'js/',
    dev:        basePaths.dev  + 'js/',
    dist:       basePaths.dist + 'js/'
  },
  html: {
    src:        basePaths.src  + 'html/',
    pages:      basePaths.src  + 'html/pages/**/*.hbs',
    components: basePaths.src  + 'html/components/**/*.hbs',
    partials:   basePaths.src  + 'html/partials/**/*.hbs',
    css:        basePaths.src  + 'html/css/',
    dev:        basePaths.dev,
    dist:       basePaths.dist
  },
  assets: {
    src:        basePaths.src  + 'assets/',
    dev:        basePaths.dev  + 'assets/',
    dist:       basePaths.dist + 'assets/'
  }
}


// Config
var config = {
  sass: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  }
}




/* Custom Functions
 * ========================================================================== */


// Don't unpipe on error
var streamError = function(error) {
  gutil.log(gutil.colors.red(error.toString()));
  this.emit('end');
};


// Search string in array and replace
var replaceInArray = function(array, search, insert) {
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].replace(search, insert);
  }
};


// Log messages
var log = {
  heading: function(message) {
    console.log('\n' + gutil.colors.inverse(message.toUpperCase()));
  },
  activity: function(message) {
    gutil.log(message);
  },
  empty: function() {
    console.log('');
  }
}




/* CLEAN
 * Delete directories
 * ========================================================================== */


// Clean Development
gulp.task('clean:dev', function() {
  return del(basePaths.dev);
});


// Clean Distribution
gulp.task('clean:dist', function() {
  return del(basePaths.dist);
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// Sass Development Function
var sassDev = function(event) {
  log.heading('Compile Sass');

  log.activity('Starting...');
  gulp.src(paths.css.src + '**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer(config.sass.autoprefixer))
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dev))
    .pipe(browserSync.stream());
  log.activity('Finished.');
};


// Sass Development Task
gulp.task('sass:dev', function() {
  return sassDev();
});


var sassDocs = function() {
  log.heading('Compile Sass Docs');

  log.activity('Starting...');
  gulp.src(paths.html.css + '**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer(config.sass.autoprefixer))
      .pipe(rename('docs.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dev));
  log.activity('Finished.');
};


// Sass Distribution
gulp.task('sass:dist', ['clean:dist'], function() {
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(config.sass.autoprefixer))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.css.dist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// JavaScript Development Function
var jsDev = function() {
  log.heading('Concat JavaScript');

  log.activity('Starting...');
  gulp.src(paths.js.src + '*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('script.js'))
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dev))
    .pipe(browserSync.stream());
  log.activity('Finshed.');
};


// JavaScript Development Task
gulp.task('js:dev', function() {
  return jsDev();
});


// JavaScript Production
gulp.task('js:dist', ['clean:dist'], function() {
  return gulp.src(paths.js.src + '*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});




/* Handlebars
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


var compileHandlebars = function(source, destination) {
  return gulp.src(source)
    .pipe(frontMatter({property: 'meta'}))
    .pipe(hb({
      debug: true,
      helpers: hbLayouts,
      partials: paths.html.partials
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(destination));
};


gulp.task('handlebars:dev', function() {
  log.heading('Handlebars Development');

  log.activity('Clean dev/**/*.html');
  del.sync('dev/**/*.html');
  log.activity('Finished cleaning');

  log.activity('Compile Handlebars...');
  compileHandlebars(paths.html.pages,      paths.html.dev);
  compileHandlebars(paths.html.components, paths.html.dev + 'components');
  log.activity('Finished compiling.');
});




/* ASSETS
 * Copy assets (e.g. img or fonts)
 * ========================================================================== */


// Assets Development Function
var assetsDev = function() {
  log.heading('Assets Development');

  log.activity('Clean dev/assets');
  del.sync(paths.assets.dev + '**');
  log.activity('Finished cleaning');

  log.activity('Copy src/assets to dev/assets...');
  gulp.src(paths.assets.src + '**')
    .pipe(gulp.dest(paths.assets.dev))
    .pipe(browserSync.stream());
  log.activity('Finished copying.');
};


// Assets Development
gulp.task('assets:dev', function() {
  return assetsDev();
});


// Assets Distribution
gulp.task('assets:dist', ['clean:dist'], function() {
  return gulp.src(paths.assets.src + '**')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest(paths.assets.dev));
});




/* Production
 * Generate production ready files.
 * ========================================================================== */


gulp.task('production', ['sass:dist', 'js:dist', 'assets:dist']);




/* BROWSERSYNC
 * Open web server for cross device development
 * and auto-reload of CSS/JS/HTML.
 * ========================================================================== */


var startBrowserSync = function() {
  log.heading('Starting BrowserSync');

  browserSync({
    server: {
      baseDir: paths.html.dev
    },
    logPrefix: 'BrowserSync',
    scrollElements: ['*'],
    reloadDelay: 200
  });
}




/* DEFAULT
 * Run all *:dev tasks and watch for add/change/delete.
 *
 * Until gulp.watch becomes somewhat useful we utilize Watchr:
 * (https://github.com/bevry/watchr)
 * ========================================================================== */


gulp.task('default', ['clean:dev'], function() {

  // Run initial task queue
  sassDev();
  sassDocs();
  jsDev();

  // Start BrowserSync after initial tasks finished
  startBrowserSync();

  // Watch Sass
  watch(paths.css.src + '**/*.scss', function() {
    sassDev();
  });

  // Watch JavaScript
  watch(paths.js.src + '*.js', function() {
    jsDev();
  });

  // Watch HTML
  watch(paths.html.src + '**/*.nunjucks', function() {
  });

  // Watch Assets
  watch(paths.assets.src + '**/*', function() {
    assetsDev();
  });

  log.empty();
});

