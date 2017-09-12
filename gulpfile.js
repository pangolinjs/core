'use strict'

/* DEPENDENCIES
 * ========================================================================== */

// Base
const browsersync = require('browser-sync')
const buffer = require('vinyl-buffer')
const chokidar = require('chokidar')
const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')
const source = require('vinyl-source-stream')

// Gulp
const gulp = require('gulp')

// Utilities
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')

// CSS
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const sassVars = require('gulp-sass-vars')
const stylelint = require('gulp-stylelint')

// JavaScript
const babelify = require('babelify')
const browserify = require('browserify')
const envify = require('envify/custom')
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')

// HTML
const htmlLint = require('./lib/htmlLint.js')
const htmlRenderComponents = require('./lib/htmlRenderComponents')
const htmlRenderPrototypes = require('./lib/htmlRenderPrototypes')

// Images
const imagemin = require('gulp-imagemin')
const svgSprite = require('gulp-svg-sprite')

const log = require('./lib/log')

/* CONFIGURATION
 * ========================================================================== */

// CWD
const cwd = gutil.env.dir
const sgModuleDir = process.cwd()

// Switch CWD to actual working directory
if (!process.env.TEST) {
  process.chdir(cwd)
}

let {paths, config} = require('./lib/config')

try {
  Object.assign(paths, require(`${cwd}/` + (gutil.env.paths || 'config/paths.json')))
} catch (error) {
  log.defaultPath()
}

// Add input paths
paths.src = `${cwd}/src`
paths.dev = `${cwd}/dev`
paths.prev = `${cwd}/prev`
paths.dist = `${cwd}/dist`
paths.nodeModules = `${cwd}/node_modules`

try {
  Object.assign(config, require(`${cwd}/` + (gutil.env.config || 'config/config.json')))
} catch (error) {
  log.defaultConfiguration()
}

// Load branding

let brandingObject = {}

try {
  brandingObject = require(`${cwd}/config/branding.json`)
} catch (error) {
  log.defaultBranding()
}

/* CLEAN
 * Delete directories
 * ========================================================================== */

// Clean Development
gulp.task('clean:dev', () => {
  return fs.emptyDirSync(paths.dev)
})

// Clean Preview
gulp.task('clean:prev', () => {
  return fs.emptyDirSync(paths.prev)
})

// Clean Distribution
gulp.task('clean:dist', () => {
  return fs.emptyDirSync(paths.dist)
})

// Clean Dev Images
gulp.task('clean:img', () => {
  return fs.emptyDirSync(`${paths.dev}/img`)
})

/* CSS
 * Compile Sass into CSS
 * ========================================================================== */

// CSS Lint
gulp.task('css:lint', () => {
  return gulp.src(`${paths.src}/**/*.scss`)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
})

// CSS Lint Break
gulp.task('css:lint:break', () => {
  return gulp.src(`${paths.src}/**/*.scss`)
    .pipe(stylelint({
      failAfterError: true,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
})

// CSS Development
gulp.task('css:dev', () => {
  return gulp.src(`${paths.src}/main.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass(config.css.dev).on('error', sass.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename(paths.output.css.name))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dev}/${paths.output.css.path}`))
    .pipe(browsersync.stream({match: '**/*.css'}))
})

// CSS Watch
gulp.task('css:watch', ['css:lint', 'css:dev'])

// CSS Styleguide
gulp.task('css:sg', () => {
  return gulp.src(`${sgModuleDir}/docs/sg.scss`)
    .pipe(sassVars(brandingObject.css || {}, { verbose: false }))
    .pipe(sourcemaps.init())
    .pipe(sass(config.css.dist))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dev}/${paths.output.css.path}`))
})

// CSS Preview
gulp.task('css:prev', () => {
  return gulp.src(`${paths.src}/main.scss`)
    .pipe(sass(config.css.dist))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename(paths.output.css.name))
    .pipe(gulp.dest(`${paths.prev}/${paths.output.css.path}`))
})

// CSS Production
gulp.task('css:dist', () => {
  return gulp.src(`${paths.src}/main.scss`)
    .pipe(sass(config.css.dist))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(rename(paths.output.css.name))
    .pipe(gulp.dest(`${paths.dist}/${paths.output.css.path}`))
})

/* JAVASCRIPT
 * Lint, bundle and transpile JavaScript
 * ========================================================================== */

// JavaScript Lint
gulp.task('js:lint', () => {
  return gulp.src(`${paths.src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
})

// JavaScript Lint Break
gulp.task('js:lint:break', () => {
  return gulp.src(`${paths.src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// JavaScript Dev
gulp.task('js:dev', () => {
  const b = browserify({
    entries: `${paths.src}/main.js`,
    debug: true,
    transform: [babelify]
  })

  b.transform(envify({
    _: 'purge',
    NODE_ENV: 'development'
  }), {
    global: true
  })

  return b.bundle().on('error', function (error) {
    log.browserifyError(error)
    this.emit('end')
  })
    .pipe(source(paths.output.js.name))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dev}/${paths.output.js.path}`))
    .pipe(browsersync.stream({match: '**/*.js'}))
})

// JavaScript Watch
gulp.task('js:watch', ['js:lint', 'js:dev'])

// JavaScript Styleguide
gulp.task('js:sg', () => {
  const b = browserify({
    entries: `${sgModuleDir}/docs/sg.js`,
    debug: true,
    transform: [babelify]
  })

  return b.bundle()
    .pipe(source('sg.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.dev}/${paths.output.js.path}`))
})

// JavaScript Preview
gulp.task('js:prev', () => {
  const b = browserify({
    entries: `${paths.src}/main.js`,
    debug: true,
    transform: [babelify]
  })

  b.transform(envify({
    _: 'purge',
    NODE_ENV: 'development'
  }), {
    global: true
  })

  return b.bundle()
    .pipe(source(paths.output.js.name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.prev}/${paths.output.js.path}`))
})

// JavaScript Production
gulp.task('js:dist', () => {
  const b = browserify({
    entries: `${paths.src}/main.js`,
    debug: true,
    transform: [babelify]
  })

  b.transform(envify({
    _: 'purge',
    NODE_ENV: 'production'
  }), {
    global: true
  })

  return b.bundle()
    .pipe(source(paths.output.js.name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.dist}/${paths.output.js.path}`))
})

/* HTML
 * Pre-compile Nunjucks files into HTML
 * ========================================================================== */

// HTML Lint
gulp.task('html:lint', () => {
  return gulp.src(`${paths.src}/prototypes/**/*.njk`)
    .pipe(htmlRenderPrototypes(config.html.dev, paths, brandingObject))
    .pipe(htmlLint({ failAfterError: false }))
})

// HTML Lint Break
gulp.task('html:lint:break', () => {
  return gulp.src(`${paths.src}/prototypes/**/*.njk`)
    .pipe(htmlRenderPrototypes(config.html.dev, paths, brandingObject))
    .pipe(htmlLint({ failAfterError: true }))
})

// HTML Development Components
gulp.task('html:dev:components', () => {
  return gulp.src(`${paths.src}/components/**/*.guide.njk`)
    .pipe(htmlRenderComponents(config.html.dev, paths, brandingObject))
    .pipe(gulp.dest(`${paths.dev}/components`))
})

// HTML Development Prototypes
gulp.task('html:dev:prototypes', () => {
  return gulp.src(`${paths.src}/prototypes/**/*.njk`)
    .pipe(htmlRenderPrototypes(config.html.dev, paths, brandingObject))
    .pipe(gulp.dest(`${paths.dev}`))
})

// HTML Development
gulp.task('html:dev', ['html:dev:components', 'html:dev:prototypes'])

// HTML Watch
gulp.task('html:watch', ['html:dev'], browsersync.reload)

// HTML Preview
gulp.task('html:prev', () => {
  return gulp.src(`${paths.src}/prototypes/**/*.njk`)
    .pipe(htmlRenderPrototypes(config.html.dev, paths, brandingObject))
    .pipe(gulp.dest(`${paths.prev}`))
})

/* Images
 * Copy images and use a lossless compressor
 * ========================================================================== */

const imageminConfig = [
  imagemin.jpegtran(config.img.imagemin.jpg),
  imagemin.optipng(config.img.imagemin.png),
  imagemin.svgo(config.img.imagemin.svg)
]

// Images Dev Copy
gulp.task('img:copy:dev', ['clean:img'], () => {
  return gulp.src(`${paths.src}/images/**`)
    .pipe(gulp.dest(`${paths.dev}/${paths.output.img.path}`))
})

// Images Dev Icons
gulp.task('img:icons:dev', ['clean:img'], () => {
  return gulp.src(`${paths.src}/components/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDev).on('error', error => console.log(error)))
    .pipe(gulp.dest(`${paths.dev}/${paths.output.img.path}`))
})

// Images Dev
gulp.task('img:dev', ['img:copy:dev', 'img:icons:dev'])

// Images Watch
gulp.task('img:watch', ['img:dev'], browsersync.reload)

// Images Preview Copy
gulp.task('img:copy:prev', () => {
  return gulp.src(`${paths.src}/images/**`)
    .pipe(imagemin(imageminConfig))
    .pipe(gulp.dest(`${paths.prev}/${paths.output.img.path}`))
})

// Images Preview Icons
gulp.task('img:icons:prev', () => {
  return gulp.src(`${paths.src}/components/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDist))
    .pipe(gulp.dest(`${paths.prev}/${paths.output.img.path}`))
})

// Images Preview
gulp.task('img:prev', ['img:copy:prev', 'img:icons:prev'])

// Images Production Copy
gulp.task('img:copy:dist', () => {
  return gulp.src(`${paths.src}/images/**`)
    .pipe(imagemin(imageminConfig))
    .pipe(gulp.dest(`${paths.dist}/${paths.output.img.path}`))
})

// Images Production Icons
gulp.task('img:icons:dist', () => {
  return gulp.src(`${paths.src}/components/icons/*.svg`)
    .pipe(svgSprite(config.img.svgSpriteDist))
    .pipe(gulp.dest(`${paths.dist}/${paths.output.img.path}`))
})

// Images Production
gulp.task('img:dist', ['img:copy:dist', 'img:icons:dist'])

/* COPY
 * Copy files from one location to another
 * ========================================================================== */

const simpleCopy = task => {
  const copyConfig = `${paths.src}/copy.js`
  const destination = paths[task]

  let copyList = null

  try {
    delete require.cache[require.resolve(copyConfig)]
    copyList = require(copyConfig)
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(error.code)
    } else {
      log.copyMissing(copyConfig)
    }
  }

  if (Array.isArray(copyList) && copyList.length > 0) {
    for (let item of copyList) {
      let exclude = false

      if (Array.isArray(item.exclude)) {
        exclude = item.exclude.indexOf(task) !== -1
      } else if (task === item.exclude) {
        exclude = true
      }

      if (!exclude) {
        glob(path.join(cwd, item.folder, item.files), { nodir: true }, function (globError, files) {
          files.forEach(function (fileSrc) {
            let fileDest = `${destination}/${item.dest}/${path.relative(cwd + '/' + item.folder, fileSrc)}`

            try {
              fs.copySync(fileSrc, fileDest)
              log.copyFile(path.relative(cwd, fileSrc), path.relative(cwd, fileDest))
            } catch (fsError) {
              console.error(fsError)
            }
          })
        })
      }
    }

    browsersync.reload()
  }
}

// Copy dev
gulp.task('copy:dev', () => {
  return simpleCopy('dev')
})

// Copy watch
gulp.task('copy:watch', ['copy:dev'])

// Copy preview
gulp.task('copy:prev', () => {
  return simpleCopy('prev')
})

// Copy production
gulp.task('copy:dist', () => {
  return simpleCopy('dist')
})

/* DEVELOPMENT
 * ========================================================================== */

gulp.task('build:dev', ['clean:dev'], () => {
  runSequence(['css:dev', 'css:sg', 'js:dev', 'js:sg', 'html:dev', 'img:dev', 'copy:dev'])
})

// Deprecated
gulp.task('development', ['build:dev'])

/* PREVIEW
 * ========================================================================== */

gulp.task('build:prev', ['clean:prev'], () => {
  runSequence(['css:prev', 'js:prev', 'html:prev', 'img:prev', 'copy:prev'])
})

// Deprecated
gulp.task('preview', ['build:prev'])

/* BUILD
 * ========================================================================== */

gulp.task('build:dist', ['clean:dist'], () => {
  runSequence(['css:dist', 'js:dist', 'img:dist', 'copy:dist'])
})

// Alias for `build:dist`
gulp.task('build', ['build:dist'])

// Deprecated
gulp.task('production', ['build'])

/* TEST
 * ========================================================================== */

gulp.task('test', ['css:lint:break', 'js:lint:break', 'html:lint:break'])

/* DEFAULT
 * ========================================================================== */

config.html.browsersync.notify = {
  styles: [
    'position: fixed',
    'z-index: 10000',
    'box-sizing: border-box',
    'height: 2rem',
    'top: 0',
    'right: 2rem',
    'padding: 0 1rem',
    'font-size: 0.875rem',
    'font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
    'font-weight: 400',
    'text-transform: uppercase',
    'line-height: 2rem',
    'letter-spacing: 0.02em',
    `color: ${brandingObject.css ? brandingObject.css['color-text'] : '#fff'}`,
    `background-color: ${brandingObject.css ? brandingObject.css['color-primary'] : 'rgb(29, 80, 151)'}`
  ]
}

gulp.task('browsersync', () => {
  config.html.browsersync.server = paths.dev
  browsersync(config.html.browsersync)
})

gulp.task('watcher', () => {
  const options = {
    cwd: paths.src + '/',
    ignoreInitial: true,
    ignorePermissionErrors: true
  }

  const message = (event, filepath) => {
    console.log('\n')
    gutil.log(`${event[0].toUpperCase() + event.slice(1)} ${gutil.colors.blue(filepath)}`)
  }

  chokidar.watch(`${paths.src}/**/*.scss`, options)
    .on('all', (event, filepath) => {
      message(event, filepath)
      runSequence('css:watch')
    })

  chokidar.watch(`${paths.src}/**/*.js`, options)
    .on('all', (event, filepath) => {
      message(event, filepath)
      runSequence('js:watch')
    })

  chokidar.watch(`${paths.src}/**/*.njk`, options)
    .on('all', (event, filepath) => {
      message(event, filepath)
      runSequence('html:watch')
    })

  chokidar.watch([`${paths.src}/images/**`, `${paths.src}/components/icons/*.svg`], options)
    .on('all', (event, filepath) => {
      message(event, filepath)
      runSequence('img:watch')
    })

  chokidar.watch(`${paths.src}/copy.js`, options)
    .on('all', (event, filepath) => {
      message(event, filepath)
      runSequence('copy:watch')
    })
})

gulp.task('dev', ['clean:dev', 'css:lint', 'js:lint'], () => {
  runSequence(
    ['css:dev', 'css:sg', 'js:dev', 'js:sg', 'html:dev', 'img:dev', 'copy:dev'],
    'browsersync', 'watcher'
  )
})

gulp.task('default', ['dev'])
