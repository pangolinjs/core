'use strict';

/* eslint-env node */
/* eslint no-console: "off" */



/* MODULES
 * ========================================================================== */


// Base
const fs           = require('fs');
const glob         = require('glob');
const del          = require('del');
const path         = require('path');
const mkdirp       = require('mkdirp');
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
const config       = require('./gulp/config.json');




/* CLEAN
 * Delete directories
 * ========================================================================== */


// Clean Development
gulp.task('clean-dev', () => {
  return del(paths.dev);
});


// Clean Preview
gulp.task('clean-prev', () => {
  return del(paths.prev);
});


// Clean Distribution
gulp.task('clean-dist', () => {
  return del(paths.dist);
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


// CSS Preview
gulp.task('css-prev', () => {
  return gulp.src(`${paths.css.src}/**/*.scss`)
    .pipe(sass(config.css.dist).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.css.prev));
});

// CSS Production
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


// JavaScript Styleguide
gulp.task('js-sg', () => {
  return gulp.src(`${paths.html.src}/js/sg.js`)
    .pipe(eslint(config.js.eslint))
    .pipe(eslint.format())
    .pipe(babel(config.js.babel).on('error', babelError))
    .pipe(gulp.dest(paths.js.dev));
});


// JavaScript Preview
gulp.task('js-prev', () => {
  return gulp.src([
    `${paths.js.src}/libraries/**/*.js`,
    `${paths.js.src}/functions/**/*.js`,
    `${paths.js.src}/components/**/*.js`
  ])
    .pipe(babel(config.js.babel))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.prev));
});


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

  if (task === 'preview') {
    gulpSrc  = [pageDir, `!${componentDir}`];
    gulpDest = paths.html.prev;
  }

  let dataMeta = {
    version: require('./package.json').version,
    lang: require('./package.json').lang,
    dev: task === 'dev',
  };


  // Create dataPages object
  let pageList = glob.sync(pageDir);
  let dataPages = {
    categories: {}
  };

  for (let page of pageList) {
    let frontMatter = fm(fs.readFileSync(page, 'utf8')).attributes;
    let url         = path.relative(`${paths.html.src}/pages`, page).replace('.hbs', '.html').replace(/\\/g, '/');
    let name        = frontMatter.title ? frontMatter.title : url;
    let category    = frontMatter.category ? frontMatter.category : 'Undefined';

    let pageItem = {
      name,
      url
    };

    if (dataPages.categories.hasOwnProperty(category)) {
      dataPages.categories[category].pages.push(pageItem);
    } else {
      dataPages.categories[category] = {
        name: category,
        icon: category[0],
        pages: [pageItem]
      };
    }
  }


  // Create Handlebars Stream with partials, helpers and data
  let hbStream = hb(config.html.hb)
    .partials(`${paths.html.src}/partials/**/*.hbs`)
    .helpers(require('handlebars-layouts'))
    .helpers({
      // Handlebars concat helper
      // Source: http://stackoverflow.com/a/34812062
      concat: (json) => {
        let output = '';
        let flipArray = [];

        for (let key in json.hash) {
          flipArray.push(json.hash[key]);
        }

        for (let i = (flipArray.length - 1); i >= 0; i--) {
          output += flipArray[i];
        }

        return output;
      },
      page: (key, options) => {
        let file = options.data.file.path;

        // Initialize variables
        let currentPath;
        let sourcePath;

        let frontMatter = fm(fs.readFileSync(file, 'utf8')).attributes;

        switch (key) {
          case 'filebase':
            return path.basename(file, '.hbs');

          case 'filename':
            return `${path.basename(file, '.hbs')}.html`.replace('index.html', '');

          case 'filepath':
            return path.relative(`${paths.html.src}/pages`, file).replace('.hbs', '.html').replace('index.html', '').replace(/\\/g, '/');

          case 'rel':
            currentPath = path.dirname(file);
            sourcePath  = path.resolve(`${paths.html.src}/pages`);

            if (currentPath === sourcePath) {
              return '';
            }

            return `${path.relative(currentPath, sourcePath)}/`.replace(/\\/g, '/');

          case 'title':
            return frontMatter.title;

          case 'description':
            return frontMatter.description;

          case 'category':
            return frontMatter.category;
        }

        if (frontMatter.hasOwnProperty(key)) {
          return frontMatter[key];
        }
      }
    })
    .data({
      meta: dataMeta,
      pages: dataPages
    });


  return gulp.src(gulpSrc)
    .pipe(gulpFm({property: 'fm'}))
    .pipe(hbStream.on('error', handlebarsError))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(gulpDest));
};


// HTML Development
gulp.task('html-dev', () => {
  return compileHandlebars('dev');
});


// HTML Watch
gulp.task('html-watch', ['html-dev'], browsersync.reload);


// HTML Preview
gulp.task('html-prev', () => {
  return compileHandlebars('preview');
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


// Images Preview Copy
gulp.task('img-prev-copy', () => {
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
    .pipe(gulp.dest(paths.img.prev));
});

// Images Production Copy
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


// Images Preview Icons
gulp.task('img-prev-icons', () => {
  return gulp.src(`${paths.img.src}/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDist).on('error', (error) => { console.log(error); }))
    .pipe(gulp.dest(paths.img.prev));
});

// Images Production Icons
gulp.task('img-dist-icons', () => {
  return gulp.src(`${paths.img.src}/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDist).on('error', (error) => { console.log(error); }))
    .pipe(gulp.dest(paths.img.dist));
});


// Images Preview
gulp.task('img-prev', ['img-prev-copy', 'img-prev-icons']);

// Images Production
gulp.task('img-dist', ['img-dist-copy', 'img-dist-icons']);




/* COPY
 * Copy files from node modules.
 * ========================================================================== */

let simpleCopy = (taskDest) => {
  let copyConfig = `./gulp/copy.js`;

  delete require.cache[require.resolve(copyConfig)];
  let copyList = require(copyConfig);

  if (Array.isArray(copyList) && copyList.length > 0) {
    for (let item of copyList) {

      glob(`${item.folder}/${item.files}`, {nodir: true}, function(globError, files) {
        files.forEach(function(file) {
          let filePath = path.relative(`${item.folder}`, file);
          let fileDir  = path.dirname(filePath);

          if (fileDir === '.') {
            fileDir = '';
          }

          mkdirp(`${taskDest}/${item.dest}/${fileDir}`, function(mkdirError) {
            if (mkdirError) {
              console.error(mkdirError);
            }

            fs.createReadStream(file).pipe(fs.createWriteStream(`${taskDest}/${item.dest}/${filePath}`));
          });
        });
      });
    }

    browsersync.reload();
  }
};

// Copy dev
gulp.task('copy-dev', () => {
  return simpleCopy(paths.dev);
});


// Copy watch
gulp.task('copy-watch', ['copy-dev']);


// Copy preview
gulp.task('copy-prev', () => {
  return simpleCopy(paths.prev);
});

// Copy production
gulp.task('copy-dist', () => {
  return simpleCopy(paths.dist);
});




/* Development
 * Generate development files.
 * ========================================================================== */


gulp.task('development', ['clean-dev'], () => {
  runSequence(['css-dev', 'css-sg', 'js-dev', 'js-sg', 'html-dev', 'img-dev', 'copy-dev']);
});



/* Preview
 * Generate files for preview.
 * ========================================================================== */


gulp.task('preview', ['clean-prev'], () => {
  runSequence(['css-prev', 'js-prev', 'html-prev', 'img-prev', 'copy-prev']);
});




/* Production
 * Generate production ready files.
 * ========================================================================== */


gulp.task('production', ['clean-dist'], () => {
  runSequence(['css-dist', 'js-dist', 'img-dist', 'copy-dist']);
});




/* DEFAULT
 * Run all dev tasks and watch for changes.
 * ========================================================================== */


gulp.task('browsersync', () => {
  // Setup Browsersync root directory
  config.html.browsersync.server = paths.html.dev;

  // Fire up Browsersync
  browsersync(config.html.browsersync);
});


gulp.task('default', ['clean-dev'], () => {
  let onChangeMessage = (event) => {
    console.log('\n');
    gutil.log(`${gutil.colors.blue(event.path)} ${event.type}`);
  };

  // Run initial task queue
  runSequence(['css-dev', 'css-sg', 'js-dev', 'js-sg', 'html-dev', 'img-dev', 'copy-dev'], 'browsersync');

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
  let watchCopy = gulp.watch(`gulp/copy.js`, ['copy-watch']);
  watchCopy.on('change', onChangeMessage);
});
