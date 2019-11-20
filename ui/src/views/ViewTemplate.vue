<template>
  <v-content>
    <c-index-header :title="title" />
    <c-source :path="source" />
  </v-content>
</template>

<script>
import CIndexHeader from '../components/CIndexHeader.vue'
import CSource from '../components/CSource.vue'

export default {
  name: 'ViewTemplate',

  components: {
    CIndexHeader,
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
