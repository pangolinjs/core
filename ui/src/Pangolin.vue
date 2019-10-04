<template>
  <v-app id="pangolin">
    <c-sidebar />
    <router-view />
  </v-app>
</template>

<script>
import api from './api'

import CSidebar from './components/CSidebar.vue'

export default {
  name: 'Pangolin',

  components: {
    CSidebar
  },

  mounted () {
    this.$communicator.$on('reload', async () => {
      const components = await api.get('pangolin/components.json').json()
      this.$store.commit('components', components)
    })
  }
}
</script>
