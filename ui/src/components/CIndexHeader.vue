<template>
  <v-app-bar
    :color="color"
    app
    dense
    dark
  >
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <v-toolbar-title>Components</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'CIndexHeader',

  metaInfo: {
    title: 'Components'
  },

  computed: {
    color () {
      return this.$store.getters.brandColor
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
