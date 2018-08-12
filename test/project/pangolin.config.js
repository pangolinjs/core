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
//       favicon: 'assets/favicon.ico'
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
