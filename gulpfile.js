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
const babel = require('gulp-babel')
const babelify = require('babelify')
const browserify = require('browserify')
const envify = require('envify/custom')
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')

// HTML
const nunjucks = require('nunjucks')

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

// Handle Browserify and Babel errors
const browserifyError = function (error) {
  if (error.filename) {
    // Babel error
    error.filename = error.filename.replace(/\\/g, '/')
    error.message = error.message.split(': ')

    console.log(`
${gutil.colors.underline(error.filename)}
  ${error.loc.line}:${error.loc.column}  ${gutil.colors.red(`error`)}  ${error.message[1]}

${error.codeFrame}
    `)
  } else {
    // Browserify error
    console.log(`
${gutil.colors.red('Browserify error')}
${error.message}
    `)
  }
  this.emit('end')
}

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

  return b.bundle().on('error', browserifyError)
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
  return gulp.src(`${sgModuleDir}/docs/sg.js`)
    .pipe(babel({ presets: ['es2015'] }))
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

nunjucks.configure({ noCache: true })

const nunjucksError = (error) => {
  console.log(`
${gutil.colors.bgRed('ERROR')} HTML rendering failed
${error.message}
`)
}

const htmlComponentsList = () => fs.readdirSync(`${paths.src}/components`)
  .map(item => `components/${item}`)

const htmlPrototypesPath = `${paths.src}/prototypes`
const htmlPrototypesList = () => glob.sync(`${htmlPrototypesPath}/**/*.njk`)
  .map(item => path.relative(htmlPrototypesPath, item)
    .replace('.njk', '').replace(/\\/g, '/'))

const htmlComponentTitle = title => {
  return title
    .replace('components/', '')
    .replace(/[\s-_.]/g, ' ')
    .replace(/^.|\s.|\/./g, word => word.toUpperCase())
}

const htmlNavigation = activeFileName => {
  let components = []
  let prototypes = []
  let branding = {}

  htmlComponentsList().forEach(fileName => {
    const sections = glob.sync(`${paths.src}/${fileName}/*.guide.njk`)

    if (sections.length > 0) {
      components.push({
        name: htmlComponentTitle(fileName),
        url: `${fileName}.html`,
        isActive: fileName === activeFileName
      })
    }
  })

  htmlPrototypesList().forEach(fileName => {
    prototypes.push({
      name: htmlComponentTitle(fileName),
      url: `${fileName}.html`,
      isActive: fileName === activeFileName
    })
  })

  if (brandingObject.logo) {
    branding.icon = brandingObject.logo.icon ? `config/${brandingObject.logo.icon}` : false
    branding.logo = brandingObject.logo.logo ? `config/${brandingObject.logo.logo}` : false
    branding.title = brandingObject.logo.title
    branding.url = brandingObject.logo.url
  }

  return { components, prototypes, branding }
}

const htmlMetaPath = fileName => {
  const toRoot = path.relative(path.dirname(`${paths.dev}/${fileName}`), paths.dev).replace(/\\/g, '/') + '/'

  return {
    filePath: `${fileName}.html`,
    fileName: `${path.basename(fileName)}.html`,
    toRoot: toRoot === '/' ? '' : toRoot
  }
}

const htmlRenderComponents = (outputPath, env) => {
  htmlComponentsList().forEach(fileName => {
    const title = htmlComponentTitle(fileName)
    const sections = glob.sync(`src/${fileName}/*.guide.njk`, { cwd })

    if (sections.length > 0) {
      const nunjucksEnv = new nunjucks.Environment(
        new nunjucks.FileSystemLoader([
          sgModuleDir, cwd
        ]))

      nunjucksEnv.addGlobal('meta', {
        env,
        title,
        nav: htmlNavigation(fileName),
        path: htmlMetaPath(fileName),
        version: require(`${cwd}/package.json`).version
      })
      nunjucksEnv.addGlobal('sections', sections) // Deprecated
      nunjucksEnv.addGlobal('sgSections', sections)
      nunjucksEnv.addGlobal('sgHeader', 'docs/header.njk')
      nunjucksEnv.addGlobal('sgSection', 'docs/section.njk')
      nunjucksEnv.addGlobal('sgNav', 'docs/nav.njk')
      nunjucksEnv.addGlobal('sgFooter', 'docs/footer.njk')

      nunjucksEnv.addFilter('addRandom', (str, min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)

        return str + (Math.floor(Math.random() * (max - min)) + min)
      })

      nunjucksEnv.render('src/layouts/components.njk', (error, result) => {
        if (error) {
          nunjucksError(error)
        }

        fs.outputFileSync(`${outputPath}/${fileName}.html`, result)
      })
    }
  })
}

const htmlRenderPrototypes = (outputPath, env) => {
  htmlPrototypesList().forEach(fileName => {
    const nunjucksEnv = new nunjucks.Environment(
      new nunjucks.FileSystemLoader([
        sgModuleDir, cwd
      ]))

    nunjucksEnv.addGlobal('meta', {
      env,
      nav: htmlNavigation(fileName),
      path: htmlMetaPath(fileName),
      version: require(`${cwd}/package.json`).version
    })
    nunjucksEnv.addGlobal('sgNav', 'docs/nav.njk')

    nunjucksEnv.addFilter('addRandom', (str, min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)

      return str + (Math.floor(Math.random() * (max - min)) + min)
    })

    nunjucksEnv.render(`src/prototypes/${fileName}.njk`, (error, result) => {
      if (error) {
        nunjucksError(error)
      }

      fs.outputFileSync(`${outputPath}/${fileName}.html`, result)
    })
  })
}

gulp.task('html:dev:components', () => {
  return htmlRenderComponents(paths.dev, 'development')
})

gulp.task('html:dev:prototypes', () => {
  return htmlRenderPrototypes(paths.dev, 'development')
})

gulp.task('html:dev', ['html:dev:components', 'html:dev:prototypes'])

gulp.task('html:watch', ['html:dev'], browsersync.reload)

gulp.task('html:prev', () => {
  return htmlRenderPrototypes(paths.prev, 'production')
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

/* SIMPLE COPY
 * Copy files from one location to another – very simple
 * ========================================================================== */

let simpleCopyMessage = (from, to) => {
  console.log(`${gutil.colors.underline(from)} => ${gutil.colors.underline(to)}`)
}

const simpleCopy = task => {
  const copyConfig = `${paths.src}/copy.js`
  const destination = paths[task]

  let copyList = null

  try {
    delete require.cache[require.resolve(copyConfig)]
    copyList = require(copyConfig)
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.log(error.code)
    } else {
      console.error(`
${gutil.colors.black.bgYellow('WARN')} The copy file ${gutil.colors.magenta(copyConfig)} is missing.
       No Files will be copied.
  `)
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
        glob(`${cwd}/${item.folder}/${item.files}`, { nodir: true }, function (globError, files) {
          files.forEach(function (fileSrc) {
            let fileDest = `${destination}/${item.dest}/${path.relative(cwd + '/' + item.folder, fileSrc)}`

            try {
              fs.copySync(fileSrc, fileDest)
              simpleCopyMessage(path.relative(cwd, fileSrc), path.relative(cwd, fileDest))
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

gulp.task('development', ['clean:dev', 'css:lint', 'js:lint'], () => {
  runSequence(['css:dev', 'css:sg', 'js:dev', 'js:sg', 'html:dev', 'img:dev', 'copy:dev'])
})

/* PREVIEW
 * ========================================================================== */

gulp.task('preview', ['clean:prev', 'css:lint:break', 'js:lint:break'], () => {
  runSequence(['css:prev', 'js:prev', 'html:prev', 'img:prev', 'copy:prev'])
})

/* PRODUCTION
 * ========================================================================== */

gulp.task('production', ['clean:dist', 'css:lint:break', 'js:lint:break'], () => {
  runSequence(['css:dist', 'js:dist', 'img:dist', 'copy:dist'])
})

/* TEST
 * ========================================================================== */

gulp.task('test', ['css:lint:break', 'js:lint:break'])

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

gulp.task('default', ['clean:dev', 'css:lint', 'js:lint'], () => {
  runSequence(
    ['css:dev', 'css:sg', 'js:dev', 'js:sg', 'html:dev', 'img:dev', 'copy:dev'],
    'browsersync', 'watcher'
  )
})
