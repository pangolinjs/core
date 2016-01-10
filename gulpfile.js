'use strict'


/* NODE MODULES
 * ========================================================================== */


// Base
var fs           = require('fs');
var glob         = require('glob');
var del          = require('del');

// Gulp
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var watch        = require('gulp-watch');
var rename       = require('gulp-rename');
var include      = require('gulp-include');
var plumber      = require('gulp-plumber');

// CSS/Sass
var sass         = require('gulp-sass');
var bless        = require('gulp-bless');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// Handelbars
var hb           = require('gulp-hb');
var frontMatter  = require('gulp-front-matter');

// Assets
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

  // Assets
  assets: {
    src:        basePaths.src  + 'assets/',
    dev:        basePaths.dev  + 'assets/',
    dist:       basePaths.dist + 'assets/'
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
    hb: function(data) {
      var options = {
        bustCache: true,
        data: data,
        helpers: 'node_modules/handlebars-layouts/index.js',
        partials: paths.html.partials
      };
      return options;
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

  // Assets
  assets: {
    imagemin: {
      progressive: true,
      interlaced: true,
      multipass: true
    }
  }
}




/* Custom Functions
 * ========================================================================== */


// Plumber Error Handler
var onError = function(err) {
  gutil.log(gutil.colors.red('Error in file ' + err.fileName + ' in line ' + err.lineNumber + ':'));
  console.log(err.message);
  this.emit('end');
};

// Search string in array and replace
var replaceInArray = function(array, searchFor, replaceWith) {
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].replace(searchFor, replaceWith);
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


// Split CSS for Internet Explorer
var sassBless = function(path, fileName) {
  gulp.src(path + fileName + '.css')
    .pipe(rename(fileName + '.splitted.css'))
    .pipe(bless({
      log: true
    }))
    .pipe(gulp.dest(path));
};


// Sass Development Function
var sassDev = function() {
  log.heading('Compile Sass');

  log.activity('Starting...');
  gulp.src(paths.css.src + '**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass(config.css.dev).on('error', sass.logError))
      .pipe(autoprefixer(config.css.autoprefixer))
      .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.css.dev))
    .pipe(browserSync.stream({match: '**/*.css'}));
  sassBless(paths.css.dev, 'styles');
  log.activity('Finished.');
};


// Sass Development Task
gulp.task('sass:dev', function() {
  return sassDev();
});


var sassStyleguide = function() {
  log.heading('Compile Styleguide Sass');

  log.activity('Starting...');
  gulp.src(paths.html.css + 'sg.scss')
    .pipe(sass(config.css.dev).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(gulp.dest(paths.css.dev));
  log.activity('Finished.');
};


// Sass Styleguide Task
gulp.task('sass:sg', function() {
  return sassStyleguide();
});


// Sass Distribution
gulp.task('sass:dist', ['clean:dist'], function() {
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sass(config.css.dist).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.css.dist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// JavaScript Development Function
var jsDev = function() {
  log.heading('Generate JavaScript');

  log.activity('Starting...');
  gulp.src([paths.js.src + '**/*.js', '!' + paths.js.src + 'libraries/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));

  gulp.src(paths.js.src + 'main.js')
    .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(rename('scripts.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dev))
    .pipe(browserSync.stream({match: '**/*.js'}));
  log.activity('Finshed.');
};


// JavaScript Development Task
gulp.task('js:dev', function() {
  return jsDev();
});


// JavaScript Production
gulp.task('js:dist', ['clean:dist'], function() {
  return gulp.src(paths.js.src + 'main.js')
    .pipe(include())
    .pipe(uglify())
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(paths.js.dist));
});




/* Handlebars
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


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

  var hbConfig = config.html.hb({
    displayNav: nav,
    navItems: {
      pages: pages,
      components: components
    }
  });

  return gulp.src(source)
    .pipe(frontMatter({property: 'meta'}))
    .pipe(plumber({errorHandler: onError}))
    .pipe(hb(hbConfig))
    .pipe(plumber.stop())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(destination));
};


var deleteHTML = function() {
  var pageList      = fs.readdirSync(paths.html.pages);
  var componentList = fs.readdirSync(paths.html.components);

  replaceInArray(pageList,      '.hbs', '.html');
  replaceInArray(componentList, '.hbs', '.html');

  var pattern = [paths.html.dev + '**/*.html'];

  for (var i = 0, item; item = pageList[i++];) {
    pattern.push('!' + paths.html.dev + item);
  }

  for (var i = 0, item; item = componentList[i++];) {
    pattern.push('!' + paths.html.dev + 'components/' + item);
  }

  return del.sync(pattern);
};


// Handlebars Development Function
var handlebarsDev = function() {
  log.heading('Handlebars Development');

  log.activity('Cleaning HTML...');
  deleteHTML();
  log.activity('Finished cleaning.');

  log.activity('Compiling Handlebars...');
  compileHandlebars(paths.html.pages      + '**/*.hbs', paths.html.dev,                true);
  compileHandlebars(paths.html.components + '**/*.hbs', paths.html.dev + 'components', true);
  log.activity('Finished compiling.');
};


// Handlebars Development Task
gulp.task('handlebars:dev', function() {
  return handlebarsDev();
});


// Handlebars Production Task
gulp.task('handlebars:dist', ['clean:dist'], function() {
  compileHandlebars(paths.html.pages, paths.html.dist, false);
});




/* ASSETS
 * Copy assets (e.g. img or fonts)
 * ========================================================================== */


// Assets Development Function
var assetsDev = function() {
  log.heading('Assets Development');

  log.activity('Cleaning assets...');
  del.sync(paths.assets.dev + '**');
  log.activity('Finished cleaning.');

  log.activity('Copying assets...');
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
    .pipe(imagemin(config.assets.imagemin))
    .pipe(gulp.dest(paths.assets.dist));
});




/* Production
 * Generate production ready files.
 * ========================================================================== */


gulp.task('production', ['sass:dist', 'js:dist', 'handlebars:dist', 'assets:dist']);




/* BROWSERSYNC
 * Open web server for cross device development
 * and auto-reload of CSS/JS/HTML.
 * ========================================================================== */


var startBrowserSync = function() {
  log.heading('Starting BrowserSync');

  browserSync(config.html.browserSync);
}




/* DEFAULT
 * Run all *:dev tasks and watch for add/change/delete.
 * ========================================================================== */


gulp.task('default', ['clean:dev'], function() {
  // Run initial task queue
  sassDev();
  sassStyleguide();
  jsDev();
  handlebarsDev();
  assetsDev();

  // Start BrowserSync after initial tasks finished
  startBrowserSync();

  // Watch Sass
  watch(paths.css.src + '**/*.scss', function() {
    sassDev();
  });

  // Watch JavaScript
  watch(paths.js.src + '**/*.js', function() {
    jsDev();
  });

  // Watch HTML
  watch(paths.html.src + '**/*.hbs', function() {
    handlebarsDev();
    browserSync.reload();
  });

  // Watch Assets
  watch(paths.assets.src + '**/*', function() {
    assetsDev();
  });

  // Add empty line for cleaner console log
  log.empty();
});

