<template>
  <v-content>
    <c-component-header />
    <c-component-render v-show="active === 'render'" />
    <c-component-source v-show="active === 'source'" />
  </v-content>
</template>

<script>
import CComponentHeader from '../components/CComponentHeader.vue'
import CComponentRender from '../components/CComponentRender.vue'
import CComponentSource from '../components/CComponentSource.vue'

export default {
  name: 'ViewComponent',

  components: {
    CComponentHeader,
    CComponentRender,
    CComponentSource
  },

  computed: {
    active () {
      return this.$route.query.show || 'render'
    }
  }
}
</script>
