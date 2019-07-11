<template>
  <v-text-field
    v-model="search"
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
