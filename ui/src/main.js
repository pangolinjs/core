import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify/lib'

import Pangolin from './Pangolin.vue'

import api from './api'
import Communicator from './plugins/communicator'
import icon from './plugins/icon.js'
import router from './router'
import store from './store'

Vue.use(Communicator)
Vue.use(VueMeta)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$icon = icon

const requests = [
  api.get('pangolin/project.json').json(),
  api.get('pangolin/components.json').json()
]

Promise.all(requests).then(([project, components]) => {
  store.commit('project', project)
  store.commit('components', components)

  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdiSvg'
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
