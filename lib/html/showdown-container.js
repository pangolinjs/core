const RE = /^(:::+) (\w+)(.*)\n([\s\S]*?)\n\1/gm

/**
 * Create container markup
 * @param {Object} converter Showdown instance
 * @param {string} name Container name
 * @param {string} title Container title
 * @param {string} content Container content
 * @returns {string} Container markup
 */
function createContainer (converter, name, title, content) {
  let output = `<div class="pangolin-container pangolin-container--${name}">`

  if (title) {
    output += `<p class="pangolin-container__title>${title}</p>`
  }

  if (name === 'component') {
    output += content
  } else {
    output += converter.makeHtml(content)
  }

  output += `</div>`

  return output
}

module.exports = {
  type: 'lang',
  filter (text, converter) {
    return text.replace(RE, (match, token, name, title, content) => createContainer(converter, name, title, content))
  }
}
