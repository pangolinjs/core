/**
 * Generate preview template
 * @param {Object} options Options
 * @param {string} [options.template=default.njk] Nunjucks template name
 * @param {string} options.head Pangolin <head> CSS and JS references
 * @param {string} options.body Page body
 * @returns {string} Preview template
 */
module.exports = function (options) {
  // Set default template if template option is missing
  if (!options.template) {
    options.template = 'default.njk'
  }

  if (!options.head) {
    throw new Error('options.head missing')
  }

  if (!options.body) {
    throw new Error('options.body missing')
  }

  if (typeof options.template !== 'string') {
    throw new TypeError('options.template must be of type string')
  }

  if (typeof options.head !== 'string') {
    throw new TypeError('options.head must be of type string')
  }

  if (typeof options.body !== 'string') {
    throw new TypeError('options.body must be of type string')
  }

  const template = []

  template.push(`{% extends "templates/${options.template}" %}`)
  template.push(`{% block pangolin_head %}${options.head}{% endblock %}`)
  template.push(`{% block body %}${options.body}{% endblock %}`)

  return template.join('\n')
}
