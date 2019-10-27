<template>
  <v-content>
    <c-index-header />
    <c-index-intro />
    <c-index-footer />
  </v-content>
</template>

<script>
import CIndexFooter from '../components/CIndexFooter.vue'
import CIndexHeader from '../components/CIndexHeader.vue'
import CIndexIntro from '../components/CIndexIntro.vue'

export default {
  name: 'ViewIndex',

  components: {
    CIndexFooter,
    CIndexHeader,
    CIndexIntro
  }
}
</script>
