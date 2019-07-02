<template>
  <!-- eslint-disable vue/no-v-html -->
  <pre
    class="component-source pa-3"
    v-html="source"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import api from '../api'

export default {
  name: 'CComponentSource',

  data () {
    return {
      source: this.getSource()
    }
  },

  watch: {
    '$route' (newRoute, oldRoute) {
      if (newRoute.path !== oldRoute.path) {
        this.getSource()
      }
    }
  },

  mounted () {
    this.$communicator.$on('reload', () => this.getSource())
  },

  methods: {
    async getSource () {
      const url = `${this.$store.state.current.path}/source.html`
      this.source = await api.get(url).text()
    }
  }
}
</script>

<style lang="scss" scoped>
.component-source {
  white-space: pre-wrap;
  overflow-y: auto;
}
</style>
