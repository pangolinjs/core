<template>
  <v-app-bar
    :color="color"
    :light="isLight"
    :dark="!isLight"
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

  computed: {
    isLight () {
      return this.$store.getters.isLightColor
    },
    color () {
      return this.$store.getters.color
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
