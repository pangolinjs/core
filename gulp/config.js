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
          'height: 40px',
          'top: 0',
          'right: 40px',
          'padding: 10px 16px',
          'font-family: Roboto, sans-serif',
          'font-size: 16px',
          'font-weight: 100',
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
