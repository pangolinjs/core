const nunjucks = require('nunjucks')

const prototypes = function (cwd, file) {
  return new Promise((resolve, reject) => {
    let nunjucksEnv = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(`${cwd}/src`)
    )

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
