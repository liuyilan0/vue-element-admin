<template>
  <div>
    <detail :is-edit="true" />
  </div>
</template>

<script>
import Detail from './components/Detail'

export default {
  name: 'BookEdit',
  components: {
    Detail
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
