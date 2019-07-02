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
    color () {
      return this.$store.getters.brandColor
    },
    storageKey () {
      return `${this.$store.state.project.id}-dark-mode`
    },
    dark: {
      get () {
        return this.$store.state.dark
      },
      set (value) {
        localStorage.setItem(this.storageKey, JSON.stringify(value))
        this.$store.commit('dark', value)
      }
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
          this.$store.commit('dark', state)
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
