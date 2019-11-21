<template>
  <v-list-group
    v-if="children"
    :group="path"
    :value="isExpanded"
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title v-text="name" />
      </v-list-item-content>
    </template>

    <v-list
      class="ml-4 py-0"
      expand
      dense
    >
      <c-sidebar-components-item
        v-for="child in children"
        :key="child.id"
        :name="child.name"
        :path="child.path"
        :children="child.children"
        :level="level + 1"
      />
    </v-list>
  </v-list-group>

  <v-list-item
    v-else
    :to="'/' + path"
    color="primary"
    dense
  >
    <v-list-item-content>
      <v-list-item-title v-text="name" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'CSidebarComponentsItem',

  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: undefined
    },
    children: {
      type: Array,
      default: undefined
    },
    level: {
      type: Number,
      default: 0
    }
  },

  computed: {
    isExpanded () {
      if (this.$store.state.search) {
        return true
      }

      return null
    }
  }
}
</script>
