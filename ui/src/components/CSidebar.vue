<template>
  <v-navigation-drawer
    v-model="sidebar"
    width="300"
    app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          Design System
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="mt-2 mb-3">
      <c-sidebar-search />
    </v-list-item>

    <v-subheader>Components</v-subheader>
    <c-sidebar-components />

    <v-subheader>Templates</v-subheader>
    <c-sidebar-templates />

    <template #append>
      <c-sidebar-dark-mode />
    </template>
  </v-navigation-drawer>
</template>

<script>
import CSidebarComponents from './CSidebarComponents.vue'
import CSidebarDarkMode from './CSidebarDarkMode.vue'
import CSidebarSearch from './CSidebarSearch.vue'
import CSidebarTemplates from './CSidebarTemplates.vue'

export default {
  name: 'CNavigation',

  components: {
    CSidebarComponents,
    CSidebarDarkMode,
    CSidebarSearch,
    CSidebarTemplates
  },
  computed: {
    title () {
      return this.$store.state.project.name
    },
    sidebar: {
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
