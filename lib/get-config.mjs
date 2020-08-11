import path from 'path'

import getPkg from './get-pkg.mjs'
import mergeObjects from './merge-objects.mjs'

const defaultConfig = {
  base: '/',

  project: {
    name: 'Pangolin.js',
    author: 'Pangolin.js',
    version: 'none'
  },

  ui: {
    color: 'orange',
    favicon: '/favicon.ico',
    format: 'json',
    lang: 'en'
  }
}

/**
 * Get config
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @returns {Object} Config
 */
export default async function ({ context }) {
  const pkg = getPkg({ context })

  if (pkg.name) {
    defaultConfig.project.name = pkg.name
  }

  if (pkg.version) {
    defaultConfig.project.version = pkg.version
  }

  if (pkg.author) {
    defaultConfig.project.author = typeof pkg.author === 'string'
      ? pkg.author
      : pkg.author.name
  }

  try {
    const { default: userConfig } = await import(path.join(context, 'pangolin.config.mjs'))
    return mergeObjects(defaultConfig, userConfig)
  } catch {
    return defaultConfig
  }
}
