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
          Pattern Library
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item class="my-2">
      <v-text-field
        v-model="search"
        :color="color"
        label="Search"
        hide-details
        clearable
        solo
      />
    </v-list-item>

    <c-sidebar-tree
      v-if="showTree"
      :search="search"
    />

    <v-switch
      v-model="dark"
      :color="color"
      :prepend-icon="$icon.sun"
      :append-icon="$icon.moon"
    />
  </v-navigation-drawer>
</template>

<script>
import CSidebarTree from './CSidebarTree.vue'

export default {
  name: 'CNavigation',

  components: {
    CSidebarTree
  },

  data () {
    return {
      search: ''
    }
  },

  computed: {
    title () {
      return this.$store.state.project.name
    },
    color () {
      return this.$store.getters.brandColor
    },
    showTree () {
      return !!this.$store.state.components.length
    },
    sidebar: {
      get () {
        return this.$store.state.sidebar
      },
      set (value) {
        this.$store.commit('sidebar', value)
      }
    },
    dark: {
      get () {
        return this.$store.state.dark
      },
      set (value) {
        this.$store.commit('dark', value)
      }
    }
  }
}
</script>
