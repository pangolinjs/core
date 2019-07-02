<template>
  <iframe
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
  }
}
</script>

<style lang="scss" scoped>
.component-render {
  display: block;
  width: 100%;
  height: 100%;

  border: 0;
}
</style>
