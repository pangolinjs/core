<template>
  <v-content>
    <c-index-header />
    <c-index-components />
    <c-index-footer />
  </v-content>
</template>

<script>
import CIndexComponents from '../components/CIndexComponents.vue'
import CIndexFooter from '../components/CIndexFooter.vue'
import CIndexHeader from '../components/CIndexHeader.vue'

export default {
  name: 'ViewIndex',

  components: {
    CIndexComponents,
    CIndexFooter,
    CIndexHeader
  }
}
</script>
