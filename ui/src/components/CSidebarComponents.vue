<template>
  <v-list
    v-if="items.length"
    expand
    dense
  >
    <c-sidebar-components-item
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :path="item.path"
      :children="item.children"
    />
  </v-list>

  <v-list-item
    v-else
    color="warning"
    dense
  >
    <v-list-item-content>
      <div class="d-flex align-center">
        <v-icon left>
          {{ $icon.fileSearch }}
        </v-icon>
        No components found
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import CSidebarComponentsItem from './CSidebarComponentsItem.vue'

export default {
  name: 'CSidebarComponents',

  components: {
    CSidebarComponentsItem
  },

  computed: {
    items () {
      return this.$store.getters.filteredComponents
    }
  }
}
</script>
