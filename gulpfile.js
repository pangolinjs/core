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
const svgSprite    = require('gulp-svg-sprite');
const imagemin     = require('gulp-imagemin');

// Paths & Config
const paths        = require('./gulp/paths.js');
const config       = require('./gulp/config.js');




/* CLEAN
 * Delete directories
 * ========================================================================== */


// Clean Development
gulp.task('clean-dev', () => {
  return del(paths.dev);
});


// Clean Distribution
gulp.task('clean-dist', () => {
  return del(paths.dist);
});


// Clean Dev HTML
gulp.task('clean-html-dev', () => {
  return del([`${paths.html.dev}/**/*.html`, `!${paths.html.dev}/img/icons.html`]);
});


// Clean Dev Images
gulp.task('clean-img-dev', () => {
  return del(`${paths.img.dev}/**`);
});




/* SASS
 * Compile Sass code into CSS
 * ========================================================================== */


// CSS Development
gulp.task('css-dev', () => {
  return gulp.src(`${paths.css.src}/**/*.scss`)
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
gulp.task('css-sg', () => {
  return gulp.src(`${paths.html.src}/css/sg.scss`)
    .pipe(sass(config.css.dev).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(gulp.dest(paths.css.dev));
});


// CSS Distribution
gulp.task('css-dist', () => {
  return gulp.src(`${paths.css.src}/**/*.scss`)
    .pipe(sass(config.css.dist).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.css.dist));
});




/* JAVASCRIPT
 * Lint javscript
 * ========================================================================== */


// Handle Bable error
let babelError = function(error) {
  console.log(
    '\n' + gutil.colors.underline(error.fileName) + '\n'
    + gutil.colors.gray('  line ' + error.loc.line + '  col ' + error.loc.column)
    + '  ' + gutil.colors.red('Babel error: ')
    + gutil.colors.blue(error.message.replace(error.fileName + ': ', '')) + '\n\n'
    + error.codeFrame + '\n'
  );
  this.emit('end');
};


// JavaScript Lint
gulp.task('js-lint', () => {
  return gulp.src([
    `${paths.js.src}/functions/**/*.js`,
    `${paths.js.src}/components/**/*.js`
  ])
    .pipe(eslint(config.js.eslint))
    .pipe(eslint.format());
});


// JavaScript Dev
gulp.task('js-dev', ['js-lint'], () => {
  return gulp.src([
    `${paths.js.src}/libraries/**/*.js`,
    `${paths.js.src}/functions/**/*.js`,
    `${paths.js.src}/components/**/*.js`
  ])
    .pipe(sourcemaps.init())
      .pipe(babel(config.js.babel).on('error', babelError))
      .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dev))
    .pipe(browsersync.stream({match: '**/*.js'}));
});


// JavaScript Watch
gulp.task('js-watch', ['js-dev']);


// JavaScript Production
gulp.task('js-dist', () => {
  return gulp.src([
    `${paths.js.src}/libraries/**/*.js`,
    `${paths.js.src}/functions/**/*.js`,
    `${paths.js.src}/components/**/*.js`
  ])
    .pipe(babel(config.js.babel))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});




/* HTML
 * Pre-compile Handlebars files into HTML
 * ========================================================================== */


// Handle Handlebars error
let handlebarsError = function(error) {
  console.log(
    '\n' + gutil.colors.underline(error.fileName) + '\n'
    + '  ' + gutil.colors.red('Handlebars error: ')
    + gutil.colors.blue(error.message.replace(error.fileName + ': ', '')) + '\n'
  );
  this.emit('end');
};


// Handlebars Function
let compileHandlebars = (task) => {
  let pageDir      = `${paths.html.src}/pages/**/*.hbs`;
  let componentDir = `${paths.html.src}/pages/components/**/*.hbs`;

  // Create gulp.src and gulp.dest variables for the
  // development and production task
  let gulpSrc  = pageDir;
  let gulpDest = paths.html.dev;

  if (task === 'dist') {
    gulpSrc  = [pageDir, `!${componentDir}`];
    gulpDest = paths.html.dist;
  }

  // Generate file lists for Styleguide navigation
  let pages      = [];
  let components = [];

  if (task === 'dev') {
    let pageList      = glob.sync(pageDir, {ignore: componentDir});
    let componentList = glob.sync(componentDir);

    for (let page of pageList) {
      let title    = fm(fs.readFileSync(page, 'utf8')).attributes.title;
      let filename = path.relative(`${paths.html.src}/pages`, page).replace('.hbs', '.html');
      let href     = filename;

      if (!title) {
        title = filename;
      }

      pages.push({title, href});
    }

    for (let component of componentList) {
      let title    = fm(fs.readFileSync(component, 'utf8')).attributes.title;
      let filename = path.relative(`${paths.html.src}/pages`, component).replace('.hbs', '.html');
      let href     = filename;

      if (!title) {
        title = filename;
      }

      components.push({title, href});
    }
  }

  // Create Handlebars Stream with partials, helpers and data
  let hbStream = hb(config.html.hb)
    .partials(`${paths.html.src}/partials/**/*.hbs`)
    .helpers(require('handlebars-layouts'))
    .helpers({
      rel: (options) => {
        let currentPath = path.dirname(options.data.file.path);
        let sourcePath  = path.resolve(`${paths.html.src}/pages`);

        if (currentPath === sourcePath) {
          return '';
        }

        return `${path.relative(currentPath, sourcePath)}/`;
      },
      // Handlebars concat helper
      // Source: http://stackoverflow.com/a/34812062
      concat: (json) => {
        var concat = '';
        var flipArray = [];

        for (let key in json.hash) {
          flipArray.push(json.hash[key]);
        }

        for (let i = (flipArray.length - 1); i >= 0; i--) {
          concat += flipArray[i];
        }

        return concat;
      }
    })
    .data({
      version: require('./package.json').version,
      lang: require('./package.json').lang,
      dev: task === 'dev' ? true : false,
      navItems: {pages, components}
    });

  return gulp.src(gulpSrc)
    .pipe(gulpFm({property: 'meta'}))
    .pipe(hbStream.on('error', handlebarsError))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(gulpDest));
};


// HTML Development
gulp.task('html-dev', ['clean-html-dev'], () => {
  return compileHandlebars('dev');
});


// HTML Watch
gulp.task('html-watch', ['html-dev'], browsersync.reload);


// HTML Production
gulp.task('html-dist', () => {
  return compileHandlebars('dist');
});




/* Images
 * Copy images and compress production files
 * ========================================================================== */


// Images Dev Copy
gulp.task('img-dev-copy', ['clean-img-dev'], () => {
  return gulp.src([
    `${paths.img.src}/**`,
    `!${paths.img.src}/icons`,
    `!${paths.img.src}/icons/**`
  ])
    .pipe(gulp.dest(paths.img.dev));
});


// Images Dev Icons
gulp.task('img-dev-icons', ['clean-img-dev'], () => {
  return gulp.src(`${paths.img.src}/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDev).on('error', (error) => { console.log(error); }))
    .pipe(gulp.dest(paths.img.dev));
});


// Images Dev
gulp.task('img-dev', ['img-dev-copy', 'img-dev-icons']);


// Images Watch
gulp.task('img-watch', ['img-dev'], browsersync.reload);


// Images Dist Copy
gulp.task('img-dist-copy', () => {
  return gulp.src([
    `${paths.img.src}/**`,
    `!${paths.img.src}/icons`,
    `!${paths.img.src}/icons/**`
  ])
    .pipe(imagemin([
      imagemin.jpegtran(config.img.imagemin.jpg),
      imagemin.optipng(config.img.imagemin.png),
      imagemin.svgo(config.img.imagemin.svg)
    ]))
    .pipe(gulp.dest(paths.img.dist));
});


// Images Dist Icons
gulp.task('img-dist-icons', () => {
  return gulp.src(`${paths.img.src}/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDist).on('error', (error) => { console.log(error); }))
    .pipe(gulp.dest(paths.img.dist));
});


// Images Distribution
gulp.task('img-dist', ['img-dist-copy', 'img-dist-icons']);




/* NPM Assets
 * Copy files from node modules.
 * ========================================================================== */

let copyNpmAssets = (taskDest) => {
  let npmAssets = require(`./${paths.src}/npm-assets.js`);

  if (Array.isArray(npmAssets) && npmAssets.length > 0) {
    for (let asset of npmAssets) {
      gulp.src(asset.glob)
        .pipe(gulp.dest(`${taskDest}/${asset.dest}`))
        .pipe(browsersync.stream());
    }
  } else {
    browsersync.reload();
  }

  delete require.cache[require.resolve(`./${paths.src}/npm-assets.js`)];
}

// NPM Assets dev copy
gulp.task('npmassets-dev', () => {
  return copyNpmAssets(paths.dev);
});


// NPM Assets watch
gulp.task('npmassets-watch', ['npmassets-dev']);


// NPM Assets dist copy
gulp.task('npmassets-dist', () => {
  return copyNpmAssets(paths.dist);
});




/* Development
 * Generate development files.
 * ========================================================================== */


gulp.task('development', ['clean-dev'], () => {
  runSequence(['css-dev', 'css-sg', 'js-dev', 'html-dev', 'img-dev', 'npmassets-dev']);
});




/* Production
 * Generate production ready files.
 * ========================================================================== */


gulp.task('production', ['clean-dist'], () => {
  runSequence(['css-dist', 'js-dist', 'html-dist', 'img-dist', 'npmassets-dist']);
});




/* DEFAULT
 * Run all dev tasks and watch for changes.
 * ========================================================================== */


gulp.task('browsersync', () => {
  browsersync(config.html.browsersync);
});


gulp.task('default', ['clean-dev'], () => {
  let onChangeMessage = (event) => {
    console.log('\n');
    gutil.log(`${gutil.colors.blue(event.path)} ${event.type}`);
  }

  // Run initial task queue
  runSequence(['css-dev', 'css-sg', 'js-dev', 'html-dev', 'img-dev', 'npmassets-dev'], 'browsersync');

  // Watch CSS
  let watchCSS = gulp.watch(`${paths.css.src}/**/*.scss`, ['css-watch']);
  watchCSS.on('change', onChangeMessage);

  // Watch JavaScript
  let watchJS = gulp.watch(`${paths.js.src}/**/*.js`, ['js-watch']);
  watchJS.on('change', onChangeMessage);

  // Watch HTML
  let watchHTML = gulp.watch(`${paths.html.src}/**/*.hbs`, ['html-watch']);
  watchHTML.on('change', onChangeMessage);

  // Watch Images
  let watchImg = gulp.watch(`${paths.img.src}/**/*`, ['img-watch']);
  watchImg.on('change', onChangeMessage);

  // Watch NPM Assets
  let watchNpmAssets = gulp.watch(`${paths.src}/npm-assets.js`, ['npmassets-watch']);
  watchNpmAssets.on('change', onChangeMessage);
});
