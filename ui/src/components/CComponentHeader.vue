<template>
  <v-app-bar
    color="primary"
    :light="light"
    :dark="!light"
    app
    flat
    dense
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
        :color="tabColor"
        background-color="transparent"
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
        <v-tab
          :to="{ query: { show: 'details' } }"
          exact
        >
          Details
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
/* globals pangolinBase */

export default {
  name: 'CComponentHeader',

  data () {
    return {
      tab: null
    }
  },

  computed: {
    title () {
      return this.$store.state.current.name
    },
    render () {
      return `${pangolinBase}${this.$store.state.current.path}/render.html`
    },
    light () {
      return this.$store.getters.isLightColor
    },
    tabColor () {
      if (this.$store.getters.isLightColor) {
        return 'rgba(0, 0, 0, 0.87)'
      }

      return '#fff'
    }
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    }
  }
}
</script>
