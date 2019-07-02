<template>
  <v-sheet
    v-if="item.type === 'folder'"
    :class="containerClass"
    :elevation="elevation"
  >
    <div class="index-item__grid">
      <component
        :is="heading"
        class="index-item__heading"
      >
        {{ item.name }}
      </component>
      <c-index-item
        v-for="child in item.children"
        :key="child.id"
        :level="level + 1"
        :item="child"
      />
    </div>
  </v-sheet>

  <v-btn
    v-else
    :to="item.path"
    color="white"
    class="mr-3 mt-2 mb-3"
  >
    {{ item.name }}
  </v-btn>
</template>

<script>
export default {
  name: 'CIndexItem',

  props: {
    level: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    elevation () {
      return this.level === 1
        ? 2
        : 0
    },
    containerClass () {
      return this.level === 1
        ? 'mb-4 pa-3'
        : ''
    },
    heading () {
      return `h${this.level + 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
.index-item__grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.index-item__heading {
  width: 100%;
  margin-bottom: 0.25em;
}
</style>
