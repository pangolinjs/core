/**
 * Generate preview template
 * @param {string} src Page source
 * @param {string} templateName Template name
 * @returns {string} Preview template
 */
module.exports = function (src, templateName) {
  const template = []

  template.push(`{% extends "templates/${templateName || 'default.njk'}" %}`)
  template.push(`{% block body %}${src}{% endblock %}`)

  return template.join('\n')
}
