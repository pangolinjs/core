<template>
  <v-app-bar
    color="primary"
    :light="isLight"
    :dark="!isLight"
    app
    flat
    dense
  >
    <v-app-bar-nav-icon @click="toggleSidebar" />
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
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
