import filterDeep from 'deepdash-es/filterDeep'
import Vue from 'vue'
import Vuex from 'vuex'

import findComponentByPath from './functions/findComponentByPath.js'
import findTemplateByPath from './functions/findTemplateByPath.js'
import getColorContrastRatio from './functions/getColorContrastRatio.js'
import getColorHex from './functions/getColorHex.js'
import getColorRGB from './functions/getColorRGB.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: undefined,
    search: '',
    project: {},
    templates: [],
    components: [],
    current: {}
  },

  getters: {
    templateByPath: state => path => {
      return findTemplateByPath(state.templates, path)
    },
    componentByPath: state => path => {
      return findComponentByPath(state.components, path)
    },
    color (state) {
      const color = state.project.branding.color
      return getColorHex(color)
    },
    isContrastingColor (_, getters) {
      const color = getColorRGB(getters.color)

      return {
        light: getColorContrastRatio(color, [255, 255, 255]) > 2.7,
        dark: getColorContrastRatio(color, [66, 66, 66]) > 3.2
      }
    },
    favicon (state) {
      const branding = state.project.branding
      return (branding && branding.favicon) || ''
    },
    filteredTemplates (state) {
      if (!state.search) {
        return state.templates
      }

      const search = state.search.toLowerCase()

      return state.templates.filter(template => {
        return template.name
          .toLowerCase()
          .includes(search)
      })
    },
    filteredComponents (state) {
      if (!state.search) {
        return state.components
      }

      const search = state.search.toLowerCase()
      const options = {
        childrenPath: 'children',
        onTrue: {
          skipChildren: true
        }
      }

      const result = filterDeep(state.components, component => {
        return component.name
          .toLowerCase()
          .includes(search)
      }, options)

      // `filterDeep` returns `null` if nothing has been found,
      // but we need at least an empty array for consistency.
      return result || []
    }
  },

  mutations: {
    sidebar (state, data) {
      state.sidebar = data
    },
    search (state, data) {
      state.search = data
    },
    project (state, data) {
      Vue.set(state, 'project', data)
    },
    templates (state, data) {
      Vue.set(state, 'templates', data)
    },
    components (state, data) {
      Vue.set(state, 'components', data)
    },
    current (state, data) {
      Vue.set(state, 'current', data)
    }
  }
})
