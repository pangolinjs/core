/* globals pangolinBase */

import Vue from 'vue'
import VueRouter from 'vue-router'

import beforeEach from './beforeEach.js'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: pangolinBase,
  routes
})

router.beforeEach(beforeEach)

export default router
