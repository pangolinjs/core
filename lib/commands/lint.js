const ESLintEngine = require('eslint').CLIEngine
const html = require('../html/lint')
const stylelint = require('stylelint')

module.exports = function (args) {
  // Lint HTML
  if (args.html) {
    html()
  }

  // Lint CSS
  if (args.css) {
    stylelint.lint({
      files: 'src/**/*.?(s)css',
      formatter: require('stylelint-codeframe-formatter'),
      syntax: 'scss'
    })
      .then(data => {
        if (data.errored) {
          console.error(data.output)
          process.exit(1)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Lint JavaScript
  if (args.js) {
    const engine = new ESLintEngine()
    const report = engine.executeOnFiles(['src', '*.js'])
    const formatter = engine.getFormatter('codeframe')

    if (report.errorCount) {
      console.error(formatter(report.results))
      process.exit(1)
    }
  }
}
