const glob = require('glob')

const componentList = require('./htmlComponentList')
const componentTitle = require('./htmlComponentTitle')
const prototypeList = require('./htmlPrototypeList')

function htmlNavigation (paths, activeFileName, brandingObject) {
  activeFileName = activeFileName.replace('.njk', '').replace(/\\/g, '/')

  let components = []
  let prototypes = []
  let branding = {}

  componentList(paths).forEach(fileName => {
    const sections = glob.sync(`${paths.src}/${fileName}/*.guide.njk`)

    if (sections.length > 0) {
      components.push({
        name: componentTitle(fileName),
        url: `${fileName}.html`,
        isActive: fileName === activeFileName
      })
    }
  })

  prototypeList(paths).forEach(fileName => {
    prototypes.push({
      name: componentTitle(fileName),
      url: `${fileName}.html`,
      isActive: fileName === activeFileName
    })
  })

  if (brandingObject.logo) {
    branding.icon = brandingObject.logo.icon ? `config/${brandingObject.logo.icon}` : false
    branding.logo = brandingObject.logo.logo ? `config/${brandingObject.logo.logo}` : false
    branding.title = brandingObject.logo.title
    branding.url = brandingObject.logo.url
  }

  return { components, prototypes, branding }
}

module.exports = htmlNavigation
