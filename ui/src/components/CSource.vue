<template>
  <!-- eslint-disable vue/no-v-html -->
  <pre
    ref="source"
    class="source pa-3"
    v-html="source"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import api from '../api'

export default {
  name: 'CSource',

  props: {
    path: {
      type: String,
      required: true
    }
  },

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
      this.source = await api.getSource(`${this.path}.html`)

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

<style lang="scss" scoped>
.source {
  white-space: pre-wrap;
  overflow-y: auto;

  ::v-deep {
    * {
      transition: color 0.2s;
    }

    a {
      color: inherit;
    }

    .token.operator {
      background: none;
    }
  }
}
</style>
