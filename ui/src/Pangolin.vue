<template>
  <v-app
    id="pangolin"
    :dark="dark"
  >
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

  computed: {
    dark () {
      return this.$store.state.dark
    }
  },

  mounted () {
    this.$communicator.$on('reload', async () => {
      const components = await api.get('components.json').json()
      this.$store.commit('components', components)
    })
  }
}
</script>
