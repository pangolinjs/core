<template>
  <v-list two-line>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>Name</v-list-item-subtitle>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item
      :to="sourceLink"
      exact
    >
      <v-list-item-content>
        <v-list-item-subtitle>Source path</v-list-item-subtitle>
        <v-list-item-title>{{ sourcePath }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item :to="templateLink">
      <v-list-item-content>
        <v-list-item-subtitle>Template</v-list-item-subtitle>
        <v-list-item-title>{{ templatePath }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <template v-if="docs">
      <v-divider />

      <!-- eslint-disable vue/no-v-html -->
      <div
        class="docs px-4 py-3"
        v-html="docs"
      />
      <!-- eslint-enable vue/no-v-html -->
    </template>
  </v-list>
</template>

<script>
import api from '../api.js'

export default {
  name: 'CComponentDetails',

  data () {
    return {
      docs: ''
    }
  },

  computed: {
    current () {
      return this.$store.state.current
    },
    name () {
      return this.current.name
    },
    sourceLink () {
      return { query: { show: 'source' } }
    },
    sourcePath () {
      return `src/${this.current.path}.njk`
    },
    templateLink () {
      return `/templates/${this.current.config.template.slice(0, -4)}`
    },
    templatePath () {
      return `src/templates/${this.current.config.template}`
    }
  },

  watch: {
    '$route.path' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getDocs()
      }
    }
  },

  mounted () {
    this.getDocs()
    this.$communicator.$on('reload', () => this.getDocs())
  },

  methods: {
    async getDocs () {
      if (this.current.hasDocs) {
        const path = `${this.$store.state.current.path}/docs`
        this.docs = await api.getComponentFile(path)
      } else {
        this.docs = ''
      }
    }
  }
}
</script>

<style lang="scss">
// Battle with Vuetify's specificity.
.docs.docs {
  ul,
  ol {
    margin-bottom: 1em;
  }

  blockquote {
    margin-bottom: 1em;
    padding: 0.25em 0 0.25em 1em;

    font-style: italic;

    border-left: 0.25em solid hsl(0deg 0% 75%);

    opacity: 0.6;

    > :last-child {
      margin-bottom: 0;
    }

    .theme--dark & {
      border-left-color: hsl(0deg 0% 35%);
    }
  }

  pre,
  code {
    background: hsl(0deg 0% 96%);

    .theme--dark & {
      background: hsl(0deg 0% 7%);
    }
  }

  code {
    padding: 0 0.4em;
  }

  pre {
    position: relative;
    margin-bottom: 1em;
    padding: 1em;

    border-radius: 0.25em;

    code::after {
      position: absolute;
      top: 0.4em;
      right: 0.7em;

      font-family: "Roboto", sans-serif;
      font-size: 0.875em;

      opacity: 0.5;
    }

    code {
      padding: 0;
    }

    .language-css::after {
      content: "CSS";
    }

    .language-js::after {
      content: "JS";
    }

    .language-django::after {
      content: "HTML";
    }
  }
}
</style>
