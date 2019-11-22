export default {
  computed: {
    color () {
      const isThemeDark = this.$vuetify.theme.dark
      const isContrastingColor = this.$store.getters.isContrastingColor

      if (isThemeDark && !isContrastingColor.dark) {
        return '#fff'
      }

      if (!isThemeDark && !isContrastingColor.light) {
        return '#000'
      }

      return this.$store.getters.color
    }
  }
}
