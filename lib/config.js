const paths = {
  output: {
    css: {
      path: 'css',
      name: 'styles.css'
    },
    js: {
      path: 'js',
      name: 'scripts.js'
    },
    img: {
      path: 'img',
      icons: 'icons.svg'
    }
  }
}

const config = {
  css: {
    dev: {
      outputStyle: 'expanded',
      precision: 10
    },
    dist: {
      outputStyle: 'compressed',
      precision: 10
    }
  },

  html: {
    dev: {
      env: 'development'
    },
    dist: {
      env: 'production'
    },
    browsersync: {
      startPath: '/index.html',
      logPrefix: 'Browsersync',
      scrollElements: ['*']
    }
  },

  img: {
    svgSpriteDev: {
      mode: {
        symbol: {
          dest: '',
          sprite: paths.output.img.icons,
          example: {
            dest: 'icons.html'
          }
        }
      },
      shape: {
        id: {
          generator: '%s-icon'
        }
      }
    },
    svgSpriteDist: {
      mode: {
        symbol: {
          dest: '',
          sprite: paths.output.img.icons
        }
      },
      shape: {
        id: {
          generator: '%s-icon'
        }
      }
    },
    imagemin: {
      jpg: {
        progressive: true
      },
      png: {
        optimizationLevel: 5
      },
      svg: {}
    }
  }
}

exports.paths = paths
exports.config = config
