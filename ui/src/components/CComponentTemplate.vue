<script>
import BComponentSource from './base/BComponentSource.vue'

export default {
  name: 'CComponentTemplate',

  extends: BComponentSource,

  computed: {
    file () {
      return 'template'
    }
  }
}
</script>
