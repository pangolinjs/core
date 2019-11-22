<template>
  <v-content>
    <c-header />
    <c-index-intro />
    <c-index-footer />
  </v-content>
</template>

<script>
import CHeader from '../components/CHeader.vue'
import CIndexFooter from '../components/CIndexFooter.vue'
import CIndexIntro from '../components/CIndexIntro.vue'

export default {
  name: 'ViewIndex',

  components: {
    CHeader,
    CIndexFooter,
    CIndexIntro
  }
}
</script>
