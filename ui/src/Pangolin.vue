<template>
  <v-app
    id="pangolin"
    class="pangolin"
  >
    <c-sidebar />
    <router-view />
  </v-app>
</template>

<script>
import api from './api.js'

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

      const path = this.$route.path.slice(1)

      this.$store.commit('templates', templates)
      this.$store.commit('components', components)
      this.$store.commit('current', this.$store.getters.componentByPath(path))
    })
  }
}
</script>

<style lang="scss">
html {
  // Battle with Vuetify's specificity.
  /* stylelint-disable-next-line declaration-no-important */
  overflow-y: auto !important;
}

// Battle with Vuetify's specificity.
.pangolin.pangolin {
  code {
    font-family: "Roboto Mono", monospace;
    font-weight: normal;
    font-size: 0.875em;
    white-space: pre-wrap;
    color: inherit;
    text-shadow: none;

    box-shadow: none;

    &::before,
    &::after {
      content: none;
      letter-spacing: normal;
    }

    * {
      transition: color 0.2s;
    }

    a {
      color: inherit;
    }

    .token.operator {
      background: none;
    }
  }
}
</style>
