<template>
  <v-list-item>
    <v-list-item-content class="pt-5 pb-7">
      <v-list-item-title class="title">
        {{ title }}
      </v-list-item-title>

      <v-list-item-subtitle>
        Design System
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'CSidebarHeader',

  computed: {
    title () {
      return this.$store.state.project.name
    }
  }
}
</script>
