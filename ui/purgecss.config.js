module.exports = {
  css: ['dist/pangolin/styles.css'],
  content: ['dist/pangolin/scripts.modern.js'],
  whitelist: ['*,:before,:after'],
  whitelistPatterns: [
    // Keep pseudo elements.
    /:(before|after)$/,
    // Keep transitions.
    /-(leave|enter|appear)(|-(to|from|active))$/,
    // Keep pre- or appended icon styles.
    /(prepend|append)-outer$/
  ]
}
