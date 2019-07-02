<template>
  <transition name="fade-transition">
    <v-app
      v-if="hasLoaded"
      id="pangolin"
      :dark="dark"
    >
      <c-sidebar />
      <router-view />
    </v-app>
    <v-overlay
      v-else
      :value="true"
      :opacity="0"
    >
      <v-progress-circular
        size="64"
        :color="color"
        indeterminate
      />
    </v-overlay>
  </transition>
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
    hasLoaded () {
      return !!this.$store.state.components.length
    },
    dark () {
      return this.$store.state.dark
    },
    color () {
      return this.$store.getters.brandColor
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
