<template>
  <v-treeview
    ref="tree"
    :items="items"
    :active.sync="active"
    :open.sync="open"
    :search="search"
    :color="color"
    activatable
    open-on-click
    dense
    @update:open="handleOpen"
    @update:active="handleActive"
  >
    <template #prepend="{ item }">
      <v-icon v-if="$icon[item.type]">
        {{ $icon[item.type] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: 'CSidebarTree',

  data () {
    return {
      active: [],
      open: [],
      initiallyOpen: []
    }
  },

  computed: {
    color () {
      return this.$store.getters.brandColor
    },
    items () {
      return this.$store.state.components
    },
    storageKey () {
      return `${this.$store.state.project.id}-sidebar`
    },
    search () {
      return this.$store.state.search
    },
    path () {
      return this.$store.state.current.path
    }
  },

  watch: {
    search (value) {
      // Collapse tree and re-open current path.
      if (!value) {
        this.$refs.tree.updateAll(false)
        this.openActivated()
        return
      }

      this.$refs.tree.updateAll(true)
    }
  },

  created () {
    // This cannot be done in `mounted` hook, because then it's to late
    // and Vuetify already started emitting events.
    this.getInitialState()

    // This can be done either in `created` or in `mounted` hook, but since
    // `created` is already in use, we don't need to add another hook.
    this.setInitialState()
  },

  methods: {
    handleOpen (items) {
      localStorage.setItem(this.storageKey, JSON.stringify(items))
    },
    handleActive ([path]) {
      if (!path) {
        return
      }

      this.$router.push(`/${path}`)
    },
    getInitialState () {
      try {
        const state = JSON.parse(localStorage.getItem(this.storageKey))

        if (Array.isArray(state)) {
          this.initiallyOpen = state
        } else {
          localStorage.removeItem(this.storageKey)
        }
      } catch (error) {
        localStorage.removeItem(this.storageKey)
      }
    },
    setInitialState () {
      this.openSaved()
      this.openActivated()
    },
    openSaved () {
      this.open.push(...this.initiallyOpen)
    },
    openActivated () {
      if (!this.path) {
        return
      }

      // Highlight current path.
      this.active = [this.path]

      // Open tree for current path.
      this.path.split('/').forEach((item, index, segments) => {
        const currentPath = segments
          .slice(0, index + 1)
          .join('/')

        this.open.push(currentPath)
      })
    }
  }
}
</script>
