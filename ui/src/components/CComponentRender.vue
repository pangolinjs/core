<template>
  <iframe
    ref="render"
    class="component-render"
    :src="render"
  />
</template>

<script>
export default {
  name: 'CComponentRender',

  computed: {
    render () {
      return `/${this.$store.state.current.path}/render.html`
    }
  },

  mounted () {
    this.$communicator.$on('reload', () => {
      /**
       * Reload iframe location
       * @see {@link https://stackoverflow.com/a/86771/9208523}
       */
      this.$refs.render.contentWindow.location.reload()
    })
  }
}
</script>

<style lang="scss" scoped>
.component-render {
  display: block;
  width: 100%;
  height: 100%;

  background: #fff;
  border: 0;
}
</style>
