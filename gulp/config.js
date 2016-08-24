/* CONFIGURATION
 * ========================================================================== */



const paths = require('./paths.js');



module.exports = {
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

  // JavaScript
  js: {
    eslint: {
      configFile: "./gulp/eslint.json"
    },
    babel: {
      presets: ['es2015'],
      ignore: 'libraries/*.js'
    }
  },

  // HTML
  html: {
    hb: {
      bustCache: true
    },
    browsersync: {
      server: paths.html.dev,
      startPath: '/index.html',
      logPrefix: 'Browsersync',
      scrollElements: ['*'],
      notify: {
        styles: [
          'display: flex',
          'align-items: center',
          'position: fixed',
          'z-index: 9999',
          'box-sizing: border-box',
          'height: 2.5em',
          'top: 0',
          'right: 2.5em',
          'padding: 0.625em 1em',
          'font-family: -apple-system, BlinkMacSystemFont,\
            "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",\
            "Fira Sans", "Droid Sans", "Helvetica Neue",\
            sans-serif;',
          'font-size: 1rem',
          'font-weight: 400',
          'text-transform: uppercase',
          'color: #fff',
          'background-color: rgb(47, 151, 255)'
        ]
      }
    }
  },

  // Images
  img: {
    svgSpriteDev: {
      mode: {
        symbol: {
          dest: '.',
          sprite: 'icons.svg',
          example: {
            dest: 'icons.html'
          }
        }
      }
    },
    svgSpriteDist: {
      mode: {
        symbol: {
          dest: '.',
          sprite: 'icons.svg'
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
      svg: {
        plugins: [{removeUselessDefs: false}]
      }
    }
  }
};
