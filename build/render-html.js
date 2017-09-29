const nunjucks = require('nunjucks')

const prototypes = function (cwd, file) {
  return new Promise((resolve, reject) => {
    let nunjucksEnv = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(`${cwd}/src`)
    )

    nunjucksEnv.addGlobal('process', {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        FESG_ENV: process.env.FESG_ENV
      }
    })

    nunjucksEnv.render(`prototypes/${file}`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  prototypes
}
