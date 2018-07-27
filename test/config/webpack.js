// const path = require('path')

// module.exports = {
//   devServer: {
//     open: true,
//     browser: 'firefox',
//     port: 1337
//   }
// }

// module.exports = {
//   configure: {
//     entry: './src/main.js'
//   }
// }

// module.exports = {
//   configure: context => {
//     if (process.env.FESG_ENV === 'build') {
//       return {
//         output: {
//           path: path.join(context, 'output-build')
//         }
//       }
//     }

//     if (process.env.FESG_ENV === 'build:dev') {
//       return {
//         output: {
//           path: path.join(context, 'output-build-dev')
//         }
//       }
//     }
//   }
// }

// module.exports = {
//   imagemin: {
//     svgo: {
//       plugins: [{
//         // Keep symbols in icon sprites
//         cleanupIDs: false,
//         removeUselessDefs: false
//       }]
//     }
//   }
// }
