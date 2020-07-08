<template>
  <v-main>
    <c-header />
    <c-index-intro />
    <c-index-footer />
  </v-main>
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
