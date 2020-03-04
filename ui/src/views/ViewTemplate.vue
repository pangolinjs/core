<template>
  <v-content>
    <c-header />
    <c-source />
  </v-content>
</template>

<script>
import CHeader from '../components/CHeader.vue'
import CSource from '../components/CSource.vue'

export default {
  name: 'ViewTemplate',

  components: {
    CHeader,
    CSource
  }
}
</script>
