<template>
  <v-app-bar
    :color="color"
    app
    dense
    dark
  >
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer />

    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          :href="render"
          target="_blank"
          icon
          v-on="on"
        >
          <v-icon>{{ $icon.fileExport }}</v-icon>
        </v-btn>
      </template>

      <span>Open component without frame</span>
    </v-tooltip>

    <template #extension>
      <v-tabs
        v-model="tab"
        align-with-title
      >
        <v-tab
          :to="{}"
          exact
        >
          Render
        </v-tab>
        <v-tab
          :to="{ query: { show: 'source' } }"
          exact
        >
          Source
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'CComponentHeader',

  data () {
    return {
      tab: null
    }
  },

  computed: {
    color () {
      return this.$store.getters.brandColor
    },
    title () {
      return this.$store.state.current.name
    },
    render () {
      return `/${this.$store.state.current.path}/render.html`
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
