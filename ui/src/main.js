import Vue from 'vue'
import VueMeta from 'vue-meta'

import Pangolin from './Pangolin.vue'

import icon from './plugins/icon.js'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify.js'

Vue.use(VueMeta)

Vue.config.productionTip = false
Vue.prototype.$icon = icon

// eslint-disable-next-line no-new
new Vue({
  el: '#pangolin',
  router,
  store,
  vuetify,
  render: h => h(Pangolin)
})
