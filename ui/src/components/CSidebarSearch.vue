<template>
  <v-text-field
    v-model="search"
    class="sidebar-search px-4"
    label="Search"
    aria-label="Search"
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

<style lang="scss" scoped>
.sidebar-search {
  position: sticky;
  top: 16px;
  z-index: 1;
}
</style>
