const init = require('front-end-styleguide-init')
const path = require('path')
const spawn = require('child_process').spawn

const updateProject = dir => {
  spawn('npm', ['update'], {
    cwd: dir,
    shell: true,
    stdio: 'inherit'
  }).on('close', code => {
    process.exit(code)
  })
}

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
  const processArgs = process.argv
  const args = processArgs.slice(2)

  switch (args[0]) {
    case 'init':
      init(process.cwd())
      break

    case 'update':
      updateProject(process.cwd())
      break

    default:
      spawnGulp(process.cwd(), args)
      break
  }
}
