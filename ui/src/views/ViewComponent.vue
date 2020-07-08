<template>
  <v-main>
    <c-component-header />
    <c-component-render v-show="active === 'render'" />
    <c-component-source v-show="active === 'source'" />
    <c-component-details v-show="active === 'details'" />
  </v-main>
</template>

<script>
import CComponentDetails from '../components/CComponentDetails.vue'
import CComponentHeader from '../components/CComponentHeader.vue'
import CComponentRender from '../components/CComponentRender.vue'
import CComponentSource from '../components/CComponentSource.vue'

export default {
  name: 'ViewComponent',

  components: {
    CComponentDetails,
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
