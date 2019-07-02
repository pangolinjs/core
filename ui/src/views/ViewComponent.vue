<template>
  <v-content>
    <c-component-header />

    <v-sheet height="100%">
      <c-component-render v-if="active === 'render'" />
      <c-component-source v-else-if="active === 'source'" />
    </v-sheet>
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
