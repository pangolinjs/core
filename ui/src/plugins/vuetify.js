import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import store from '../store'

Vue.use(Vuetify)

const project = store.state.project
const primary = (project.branding && project.branding.colorTheme) || '#ff721f'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary,
        secondary: '#282828'
      },
      dark: {
        primary,
        secondary: '#fff'
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})
