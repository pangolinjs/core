const path = require('path')
const spawn = require('child_process').spawn

const spawnGulp = (dir, args) => {
  const gulpBin = path.resolve(require.resolve('gulp'), '../bin/gulp.js')

  spawn(`node "${gulpBin}"`, [...args, `--dir="${dir}"`], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit'
  }).on('close', code => {
    process.exit(code)
  })
}

module.exports = function () {
  spawnGulp(process.cwd(), process.argv.slice(2))
}
