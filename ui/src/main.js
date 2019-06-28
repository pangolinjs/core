import Vue from 'vue'
import VueRouter from 'vue-router'

import Pangolin from './Pangolin.vue'
import Component from './views/Component.vue'
import Index from './views/Index.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '*',
      component: Component
    }
  ]
})

// eslint-disable-next-line no-new
new Vue({
  el: '#pangolin',
  router,
  render: h => h(Pangolin)
})
