<template>
  <v-container fluid>
    <c-index-item
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </v-container>
</template>

<script>
import CIndexItem from './CIndexItem.vue'

export default {
  name: 'CIndexComponents',

  components: {
    CIndexItem
  },

  computed: {
    items () {
      return this.$store.state.components
    }
  }
}
</script>
