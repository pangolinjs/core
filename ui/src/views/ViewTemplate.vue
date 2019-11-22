<template>
  <v-content>
    <c-header :title="title" />
    <c-source :path="source" />
  </v-content>
</template>

<script>
import CHeader from '../components/CHeader.vue'
import CSource from '../components/CSource.vue'

export default {
  name: 'ViewTemplate',

  components: {
    CHeader,
    CSource
  },

  computed: {
    title () {
      return this.$store.state.current.name
    },
    source () {
      return `${this.$store.state.current.path}/source`
    }
  }
}
</script>
