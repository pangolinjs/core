<template>
  <v-content>
    <c-index-header />
    <c-index-components />
  </v-content>
</template>

<script>
import CIndexComponents from '../components/CIndexComponents.vue'
import CIndexHeader from '../components/CIndexHeader.vue'

export default {
  name: 'ViewIndex',

  components: {
    CIndexComponents,
    CIndexHeader
  }
}
</script>
