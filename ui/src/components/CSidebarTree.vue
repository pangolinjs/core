<template>
  <v-treeview
    ref="tree"
    :items="items"
    :active.sync="active"
    :open.sync="open"
    :search="search"
    :color="color"
    open-on-click
    dense
    @update:open="handleOpen"
  >
    <template #label="{ item }">
      <span v-if="item.type === 'folder'">
        {{ item.name }}
      </span>
      <v-btn
        v-else
        :to="'/' + item.path"
        text
        block
      >
        {{ item.name }}
      </v-btn>
    </template>
  </v-treeview>
</template>

<script>
// TODO: Build custom tree component to simplify this… thing.

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
      if (this.$vuetify.theme.dark && !this.$store.getters.isLightColor) {
        return '#fff'
      }

      return this.$store.getters.color
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
    },
    path (value) {
      if (value !== this.active[0]) {
        this.active = [value]
      }
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

<style lang="scss">
// TODO: Build custom tree component so this monstrosity isn’t necessary.

.v-treeview-node__root {
  .v-treeview-node--leaf > &,
  .v-treeview > .v-treeview-node--leaf > & {
    // stylelint-disable-next-line declaration-no-important
    padding: 0 !important;
  }
}

.v-treeview-node__label {
  .v-treeview-node--leaf & {
    // stylelint-disable-next-line declaration-no-important
    margin: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
.v-btn {
  justify-content: flex-start;

  &:not(.v-btn--round).v-size--default {
    height: 40px;
  }

  &::before {
    display: none;
  }
}
</style>
