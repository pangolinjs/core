import path from 'path'

import getPkg from './get-pkg.js'
import mergeObjects from './merge-objects.js'

const defaultConfig = {
  project: {
    name: 'Pangolin.js',
    author: null,
    version: null,
    base: '/assets/'
  },

  ui: {
    color: {
      accent: '#ff721f',
      complement: '#000',
      links: '#7f390f'
    },
    favicon: '/favicon.ico',
    format: 'json',
    lang: 'en',
    information: [
      {
        label: 'Version',
        value: null
      },
      {
        label: 'Built on',
        value: new Date(),
        type: 'time',
        format: value => value.toISOString().slice(0, -8).replace('T', ' ')
      }
    ],
    labels: {
      panels: {
        html: 'Render',
        view: 'Source'
      }
    }
  },

  hashFiles: 'imported'
}

/**
 * Get config
 * @param {Object} options Options
 * @param {string} [options.context] Working directory
 * @returns {Promise<Object>} Config
 */
export default async function ({ context }) {
  const pkg = await getPkg({ context })

  if (pkg.name) {
    defaultConfig.project.name = pkg.name
  }

  if (pkg.version) {
    defaultConfig.project.version = pkg.version
    defaultConfig.ui.information[0].value = pkg.version
  }

  if (pkg.author) {
    defaultConfig.project.author = typeof pkg.author === 'string'
      ? pkg.author
      : pkg.author.name
  }

  try {
    const userConfigPath = 'file://' + path.join(context, 'pangolin.config.js')
    const { default: userConfig } = await import(userConfigPath)
    return mergeObjects(defaultConfig, userConfig)
  } catch {
    return defaultConfig
  }
}
