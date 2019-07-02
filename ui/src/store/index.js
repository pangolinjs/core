import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: undefined,
    dark: false,
    project: {},
    components: [],
    current: {}
  },

  getters: {
    brandColor: state => {
      const project = state.project

      if (project.branding && project.branding.colorTheme) {
        return project.branding.colorTheme
      }

      return 'orange darken-3'
    },

    componentByPath: state => path => {
      function find (list) {
        for (let item of list) {
          if (item.path === path) {
            return item
          }

          const child = find(item.children || [])

          if (child) {
            return child
          }
        }
      }

      return find(state.components) || {}
    }
  },

  mutations: {
    sidebar (state, data) {
      state.sidebar = data
    },
    dark (state, data) {
      state.dark = data
    },
    project (state, data) {
      Vue.set(state, 'project', data)
    },
    components (state, data) {
      Vue.set(state, 'components', data)
    },
    current (state, data) {
      Vue.set(state, 'current', data)
    }
  }
})
