<template>
  <v-list-item-group color="primary">
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :to="'/' + item.path"
      dense
    >
      {{ item.name }}
    </v-list-item>
  </v-list-item-group>
</template>

<script>
export default {
  name: 'CSidebarTemplates',

  computed: {
    items () {
      return this.$store.state.templates
    }
  }
}
</script>
