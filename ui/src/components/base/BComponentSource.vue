<template>
  <!-- eslint-disable vue/no-v-html -->
  <pre
    ref="source"
    class="component-source pa-3"
    v-html="source"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import api from '../../api'

export default {
  name: 'BComponentSource',

  data () {
    return {
      source: ''
    }
  },

  watch: {
    '$route.path' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getSource()
      }
    }
  },

  mounted () {
    this.getSource()
    this.$communicator.$on('reload', () => this.getSource())
  },

  methods: {
    async getSource () {
      const url = `${this.$store.state.current.path}/${this.file}.html`
      this.source = await api.get(url).text()

      await this.$nextTick()

      const links = this.$refs.source.querySelectorAll('a')

      for (const link of links) {
        link.addEventListener('click', event => {
          event.preventDefault()
          this.$router.push(link.getAttribute('href'))
        })
      }
    }
  }
}
</script>

<style src="prismjs/themes/prism.css"></style>

<style lang="scss" scoped>
.component-source {
  white-space: pre-wrap;
  overflow-y: auto;

  ::v-deep a {
    color: inherit;
  }
}
</style>
