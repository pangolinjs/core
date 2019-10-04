<template>
  <v-app id="pangolin">
    <c-sidebar />
    <router-view />
  </v-app>
</template>

<script>
/* globals pangolinBase */

import api from './api'

import CSidebar from './components/CSidebar.vue'

const TITLE_TEMPLATE = document.title

export default {
  name: 'Pangolin',

  metaInfo () {
    return {
      title: this.$store.state.current.name,
      titleTemplate: TITLE_TEMPLATE,
      link: [
        { rel: 'shortcut icon', href: `${pangolinBase}${this.$store.getters.favicon}` }
      ]
    }
  },

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
