<template>
  <v-app-bar
    color="primary"
    app
    flat
    dense
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

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
