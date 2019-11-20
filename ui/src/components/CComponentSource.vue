<template>
  <c-source :path="source" />
</template>

<script>
import CSource from './CSource.vue'

export default {
  name: 'CComponentSource',

  components: {
    CSource
  },

  computed: {
    source () {
      return `${this.$store.state.current.path}/source`
    }
  }
}
</script>
