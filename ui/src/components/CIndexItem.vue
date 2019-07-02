<template>
  <component
    :is="container"
    v-if="item.type === 'folder'"
    :class="containerClass"
  >
    <component :is="heading">
      {{ item.name }}
    </component>
    <c-index-item
      v-for="child in item.children"
      :key="child.id"
      :level="level + 1"
      :item="child"
    />
  </component>

  <v-btn
    v-else
    :to="item.path"
    color="white"
    class="mr-3 my-3"
  >
    {{ item.name }}
  </v-btn>
</template>

<script>
import { VCard } from 'vuetify/lib'

export default {
  name: 'CIndexItem',

  components: {
    VCard
  },

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
    container () {
      return this.level === 1
        ? 'v-card'
        : 'div'
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
