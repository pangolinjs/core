/**
 * Test different project configuration possibilities
 */

// const path = require('path')

/**
 * Project settings
 */
// module.exports = {
//   project: {
//     name: 'Pangolin Test',
//     base: '/base/',
//     branding: {
//       colorTheme: '#5d675b',
//       colorTitle: '#f7ef99',
//       favicon: 'favicon.ico'
//     }
//   }
// }

/**
 * Change dev server settings
 */
// module.exports = {
//   devServer: {
//     open: true,
//     browser: 'firefox',
//     port: 1337
//   }
// }

/**
 * Tap into webpack-chain
 */
// module.exports = {
//   chain (config) {
//     if (process.env.PANGOLIN_ENV === 'build') {
//       config.output
//         .path(path.join(config.get('context'), 'output-dist'))
//     }
//   }
// }

/**
 * Merge into webpack configuration object
 */
// module.exports = {
//   configure: {
//     entry: {
//       main: ['./src/hello-world.js']
//     }
//   }
// }

/**
 * Mutate webpack configuration object
 */
// module.exports = {
//   configure (config) {
//     if (process.env.PANGOLIN_ENV === 'build') {
//       config.output.path = path.join(config.context, 'output-dist')
//     }
//   }
// }

/**
 * Custom Nunjucks filters
 */
// module.exports = {
//   nunjucks: {
//     filters: {
//       shorten: function (str, count) {
//         return str.slice(0, count || 5) + '…'
//       }
//     }
//   }
// }

/**
 * Custom Nunjucks extension
 */
// module.exports = {
//   nunjucks: {
//     extensions: {
//       uppercase: function () {
//         this.tags = ['uppercase']

//         this.parse = function (parser, nodes) {
//           const token = parser.nextToken()
//           const args = parser.parseSignature(null, true)

//           parser.advanceAfterBlockEnd(token)

//           return new nodes.CallExtension(this, 'run', args)
//         }

//         this.run = function (context, str) {
//           console.log(str)
//           if (typeof str === 'string') {
//             return str.toUpperCase()
//           }

//           return str
//         }
//       }
//     }
//   }
// }
