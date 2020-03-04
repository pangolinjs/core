import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import Pangolin from './Pangolin.vue'

import api from './api.js'
import Communicator from './plugins/communicator.js'
import icon from './plugins/icon.js'
import router from './router'
import store from './store.js'

Vue.use(Communicator)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$icon = icon

const requests = [
  api.getProject(),
  api.getTemplates(),
  api.getComponents()
]

Promise.all(requests).then(([project, templates, components]) => {
  store.commit('project', project)
  store.commit('templates', templates)
  store.commit('components', components)

  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdiSvg'
    },
    theme: {
      themes: {
        light: {
          primary: store.getters.color
        },
        dark: {
          primary: store.getters.color
        }
      }
    }
  })

  // eslint-disable-next-line no-new
  new Vue({
    el: '#pangolin',
    router,
    store,
    vuetify,
    render: h => h(Pangolin)
  })
})
