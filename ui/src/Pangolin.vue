<template>
  <v-app id="pangolin">
    <c-sidebar />
    <router-view />
  </v-app>
</template>

<script>
import api from './api'

import CSidebar from './components/CSidebar.vue'

const TITLE_TEMPLATE = document.title

export default {
  name: 'Pangolin',

  metaInfo () {
    return {
      title: this.$store.state.current.name,
      titleTemplate: TITLE_TEMPLATE
    }
  },

  components: {
    CSidebar
  },

  mounted () {
    this.$communicator.$on('reload', async () => {
      const components = await api.get('components.json').json()
      this.$store.commit('components', components)
    })
  }
}
</script>

<style lang="scss">
// FIX: icon color doesn't inherit currentColor
.v-icon--svg {
  fill: currentColor;
}
</style>
