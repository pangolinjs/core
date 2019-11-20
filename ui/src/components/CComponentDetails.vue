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
  </v-list>
</template>

<script>
export default {
  name: 'CComponentDetails',

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
  }
}
</script>
