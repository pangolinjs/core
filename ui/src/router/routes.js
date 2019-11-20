import ViewComponent from '../views/ViewComponent.vue'
import ViewIndex from '../views/ViewIndex.vue'
import ViewTemplate from '../views/ViewTemplate.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: ViewIndex
  },
  {
    path: '/templates/*',
    name: 'template',
    component: ViewTemplate
  },
  {
    path: '/components/*',
    name: 'component',
    component: ViewComponent
  }
]
