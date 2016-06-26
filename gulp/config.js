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
      extends: 'eslint:recommended',
      parserOptions: {
        ecmaVersion: 6
      },
      envs: ['browser'],
      rules: {
        // Best Practices
        'block-scoped-var': 'error',
        'curly': 'error',
        'eqeqeq': 'error',
        'no-alert': 'error',
        'no-empty-function': 'error',
        'no-extend-native': 'error',
        'no-floating-decimal': 'error',
        'no-loop-func': 'error',
        'no-native-reassign': 'error',
        'no-self-compare': 'error',
        'no-warning-comments': 'error',
        'yoda': 'error',

        // Variables
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-use-before-define': 'error',

        // Stylistic
        'array-bracket-spacing': 'error',
        'block-spacing': 'error',
        'camelcase': 'error',
        'comma-spacing': 'error',
        'computed-property-spacing': 'error',
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'no-bitwise': 'error',
        'no-mixed-operators': 'error',
        'no-spaced-func': 'error',
        'no-trailing-spaces': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'object-property-newline': 'error',
        'semi': 'error',
        'semi-spacing': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',

        // ECMAScript 6
        'arrow-spacing': 'error',
        'no-const-assign': 'error',
        'no-var': 'error',
        'rest-spread-spacing': 'error',
        'template-curly-spacing': 'error'
      }
    },
    babel: {
      presets: ['es2015']
    }
  },

  // HTML
  html: {
    hb: {
      bustCache: true
    },
    browsersync: {
      server: {
        baseDir: paths.html.dev
      },
      logPrefix: 'Browsersync',
      scrollElements: ['*'],
      reloadDelay: 300,
      notify: {
        styles: {
          height: '40px',
          right: '40px',
          padding: '11px 16px',
          fontSize: '16px',
          fontWeight: '100',
          textTransform: 'uppercase',
          backgroundColor: 'rgb(47, 151, 255)',
          borderBottomLeftRadius: 'none'
        }
      }
    }
  },

  // Images
  img: {
    svgSpriteDev: {
      log: 'info',
      mode: {
        symbol: {
          dest: '.',
          inline: true,
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
          inline: true,
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
