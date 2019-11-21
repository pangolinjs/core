<template>
  <v-navigation-drawer
    v-model="isExpanded"
    width="300"
    app
  >
    <c-sidebar-header />
    <c-sidebar-search />

    <v-subheader class="mt-5">
      Components
    </v-subheader>
    <c-sidebar-components />

    <v-subheader class="mt-3">
      Templates
    </v-subheader>
    <c-sidebar-templates />

    <template #append>
      <v-divider />
      <c-sidebar-dark-mode />
    </template>
  </v-navigation-drawer>
</template>

<script>
import CSidebarComponents from './CSidebarComponents.vue'
import CSidebarDarkMode from './CSidebarDarkMode.vue'
import CSidebarHeader from './CSidebarHeader.vue'
import CSidebarSearch from './CSidebarSearch.vue'
import CSidebarTemplates from './CSidebarTemplates.vue'

export default {
  name: 'CSidebar',

  components: {
    CSidebarComponents,
    CSidebarDarkMode,
    CSidebarHeader,
    CSidebarSearch,
    CSidebarTemplates
  },

  computed: {
    isExpanded: {
      get () {
        return this.$store.state.sidebar
      },
      set (value) {
        this.$store.commit('sidebar', value)
      }
    }
  }
}
</script>
