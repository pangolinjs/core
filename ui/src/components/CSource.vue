<template>
  <!-- eslint-disable vue/no-v-html -->
  <pre
    ref="source"
    class="source pa-3"
  ><code v-html="source" /></pre>
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import api from '../api'

export default {
  name: 'CSource',

  data () {
    return {
      source: '',
      stylesheet: document.querySelector('#prism-stylesheet')
    }
  },

  watch: {
    '$route.path' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getSource()
      }
    },
    '$vuetify.theme.dark': {
      handler (isDark) {
        const theme = isDark ? 'prism-okaidia.min.css' : 'prism.min.css'
        this.stylesheet.href = `https://cdn.jsdelivr.net/npm/prismjs@1/themes/${theme}`
      },
      immediate: true
    }
  },

  mounted () {
    this.getSource()
    this.$communicator.$on('reload', () => this.getSource())
  },

  methods: {
    async getSource () {
      const path = `${this.$store.state.current.path}/source`
      this.source = await api.getComponentFile(path)

      await this.$nextTick()

      // Enhance simple `<a>`s to behave like `<router-link>`s.
      for (const link of this.$refs.source.querySelectorAll('a')) {
        link.addEventListener('click', event => {
          event.preventDefault()
          this.$router.push(link.getAttribute('href'))
        })
      }
    }
  }
}
</script>

<style lang="scss">
// Battle with Vuetify's specificity.
.source.source {
  code {
    background: none;
    border-radius: 0;
  }
}
</style>
