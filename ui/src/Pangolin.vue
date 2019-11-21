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
      const [templates, components] = await Promise.all([
        await api.getTemplates(),
        await api.getComponents()
      ])

      this.$store.commit('templates', templates)
      this.$store.commit('components', components)
    })
  }
}
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
