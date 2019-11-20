import filterDeep from 'deepdash-es/filterDeep'
import Vue from 'vue'
import Vuex from 'vuex'

import findComponentByPath from '../functions/findComponentByPath'
import findTemplateByPath from '../functions/findTemplateByPath'
import isLightColor from '../functions/isLightColor'

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
      const branding = state.project.branding
      return (branding && branding.color) || '#ff721f'
    },
    isLightColor (state, getters) {
      return isLightColor(getters.color)
    },
    favicon (state) {
      const branding = state.project.branding
      return (branding && branding.favicon) || ''
    },
    filteredTemplates (state) {
      if (!state.search) {
        return state.templates
      }

      return state.templates.filter(template => {
        return template.name
          .toLowerCase()
          .includes(state.search.toLowerCase())
      })
    },
    filteredComponents (state) {
      if (!state.search) {
        return state.components
      }

      return filterDeep(state.components, component => {
        return component.name.toLowerCase().includes(state.search.toLowerCase())
      }, { childrenPath: 'children' }) || []
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
