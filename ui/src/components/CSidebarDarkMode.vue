<template>
  <v-switch
    v-model="dark"
    aria-label="Dark mode"
    class="justify-center my-4 py-0"
    :color="color"
    :prepend-icon="$icon.sun"
    :append-icon="$icon.moon"
    hide-details
  />
</template>

<script>
import color from '../mixins/color'

const STORAGE_KEY = 'pangolin-dark-mode'

export default {
  name: 'CSidebarDarkMode',

  mixins: [color],

  computed: {
    dark: {
      get () {
        return this.$vuetify.theme.dark
      },
      set (value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        this.$vuetify.theme.dark = value
      }
    }
  },

  created () {
    this.setInitialState()
  },

  methods: {
    setInitialState () {
      try {
        const state = JSON.parse(localStorage.getItem(STORAGE_KEY))

        if (typeof state === 'boolean') {
          this.$vuetify.theme.dark = state
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }
}
</script>
