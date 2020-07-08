<template>
  <v-main>
    <c-header />
    <c-source />
  </v-main>
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
