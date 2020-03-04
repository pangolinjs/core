<template>
  <v-list-item-group
    v-if="items.length"
    :color="color"
  >
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :to="'/' + item.path"
      dense
    >
      <v-list-item-content>
        <v-list-item-title v-text="item.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>

  <v-list-item
    v-else
    dense
  >
    <v-list-item-content>
      <div class="d-flex align-center">
        <v-icon
          size="18"
          left
        >
          {{ $icon.fileSearch }}
        </v-icon>
        No templates found
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import color from '../mixins/color.js'

export default {
  name: 'CSidebarTemplates',

  mixins: [color],

  computed: {
    items () {
      return this.$store.getters.filteredTemplates
    }
  }
}
</script>
