<template>
  <v-app-bar
    color="primary"
    :light="isLightColor"
    :dark="!isLightColor"
    app
    flat
    dense
  >
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <v-toolbar-title
      v-if="title"
      v-text="title"
    />
  </v-app-bar>
</template>

<script>
export default {
  name: 'CHeader',

  computed: {
    isLightColor () {
      return !this.$store.getters.isContrastingColor.light
    },
    title () {
      return this.$store.state.current.name
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
