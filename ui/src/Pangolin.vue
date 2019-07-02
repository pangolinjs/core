<template>
  <v-app id="pangolin">
    <c-sidebar />
    <router-view />
  </v-app>
</template>

<script>
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
  }
}
</script>
