<template>
  <v-footer
    app
    inset
    padless
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>
          Powered by <a
            href="https://pangolinjs.org"
            target="_blank"
          >Pangolin.js</a>.
        </v-list-item-title>

        <v-list-item-subtitle>
          Framework for design system development with Nunjucks, Sass, and JavaScript.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-footer>
</template>

<script>
export default {
  name: 'CIndexFooter'
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
}
</style>
