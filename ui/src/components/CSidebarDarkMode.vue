<template>
  <v-switch
    v-model="dark"
    class="sidebar-dark-mode"
    :color="color"
    :prepend-icon="$icon.sun"
    :append-icon="$icon.moon"
  />
</template>

<script>
export default {
  name: 'CSidebarDarkMode',

  computed: {
    storageKey () {
      return 'pangolin-dark-mode'
    },
    dark: {
      get () {
        return this.$vuetify.theme.dark
      },
      set (value) {
        localStorage.setItem(this.storageKey, JSON.stringify(value))
        this.$vuetify.theme.dark = value
      }
    },
    color () {
      if (this.$vuetify.theme.dark && !this.$store.getters.isLightColor) {
        return '#fff'
      }

      return this.$store.getters.color
    }
  },

  created () {
    this.setInitialState()
  },

  methods: {
    setInitialState () {
      try {
        const state = JSON.parse(localStorage.getItem(this.storageKey))

        if (typeof state === 'boolean') {
          this.$vuetify.theme.dark = state
        } else {
          localStorage.removeItem(this.storageKey)
        }
      } catch (error) {
        localStorage.removeItem(this.storageKey)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-dark-mode {
  justify-content: center;
}
</style>
