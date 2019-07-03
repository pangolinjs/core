<template>
  <v-text-field
    v-model="search"
    :color="color"
    label="Search"
    hide-details
    clearable
    solo
  />
</template>

<script>
export default {
  name: 'CSidebarSearch',

  computed: {
    color () {
      return this.$store.getters.brandColor
    },
    search: {
      get () {
        return this.$store.state.search
      },
      set (value) {
        this.$store.commit('search', value)
      }
    }
  }
}
</script>
