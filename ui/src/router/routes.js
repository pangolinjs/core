import ViewComponent from '../views/ViewComponent.vue'
import ViewIndex from '../views/ViewIndex.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: ViewIndex
  },
  {
    path: '*',
    name: 'component',
    component: ViewComponent
  }
]
