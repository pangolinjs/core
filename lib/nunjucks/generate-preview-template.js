/**
 * Generate preview template
 * @param {Object} options Options
 * @param {string} [options.template=default.njk] Nunjucks template name
 * @param {string} options.head Pangolin <head> CSS and JS references
 * @param {string} [options.body] Page body
 * @returns {string} Preview template
 */
module.exports = function (options) {
  if (!options.template) {
    options.template = 'default.njk'
  }

  if (!options.body) {
    options.body = ''
  }

  const template = []

  template.push(`{% extends "templates/${options.template}" %}`)
  template.push(`{% block pangolin_head %}${options.head}{% endblock %}`)
  template.push(`{% block pangolin_body %}${options.body}{% endblock %}`)

  return template.join('\n')
}
