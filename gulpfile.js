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

// Handlebars
var handlebars   = require('gulp-compile-handlebars');




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

  // Handlebars
  hbTemplates: path.src  + 'html/templates/*.hbs',
  hbPages:     path.src  + 'html/pages/*.hbs',
  hbPartials:  path.src  + 'html/partials/*.hbs',
  hbWatch:     path.src  + 'html',
  hbDev:       path.dev,
  hbDist:      path.dist,

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
  return del(config.htmlDev + '**/*.html');
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
    .pipe(browserSync.reload({stream: true}));
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
    .pipe(browserSync.reload({stream: true}));
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




/* HANDLEBARS
 * Pre-compile Handlebars files
 * ========================================================================== */


// Handlebars Development
gulp.task('handlebars:dev', ['clean:html'], function() {
  var file = fs.readFileSync('src/html/pages/index.hbs', 'utf8');
  var fileTitle = file.substring(0, file.indexOf('\n---') - 1);
  var fileContent = file.substring(file.indexOf('\n---') + 5);


  var templateData = {
    title: fileTitle
  };
  var options = {
    partials: {
      body: fileContent
    }
  };

  return gulp.src('src/html/templates/pages.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.hbDev));
});


// Handlebars Distribution
gulp.task('handlebars:dist', ['clean:dist'], function() {

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
    .pipe(gulp.dest(config.assetsDist));
});




/* DISTRIBUTION
 * Run alle the *:dist tasks
 * ========================================================================== */


gulp.task('distribution', ['sass:dist', 'js:dist', 'handlebars:dist', 'assets:dist']);




/* BROWSERSYNC
 * Open web server for cross device development
 * and auto-reload of CSS/JS/HTML
 * ========================================================================== */


gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: path.dev
    },
  });
});




/* DEFAULT
 * Run all *:dev tasks and watch for add/change/delete
 *
 * Until gulp.watch becomes somewhat useful
 * we utilize Watchr (https://github.com/bevry/watchr)
 * ========================================================================== */


// Capitalize first string letter
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


gulp.task('default', ['sass:dev', 'js:dev', 'handlebars:dev', 'assets:dev', 'browserSync'], function() {
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

  // Watch Handlebars
  watchr.watch({
    paths: [config.hbWatch],
    catchupDelay: 500,
    listeners: {
      error: function(err) {
        gutil.log('An error occured: '.red, err)
      },
      change: function(changeType, filePath) {
        console.log('');
        gutil.log(capitalize(changeType), gutil.colors.magenta(filePath));
        gulp.start('handlebars:dev');
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
