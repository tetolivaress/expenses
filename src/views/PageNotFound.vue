<template>
  <h1>{{ $t('Esta pagina no existe') }}</h1>
</template>
<script>
import { mapState } from 'vuex'
export default {
  mounted () {
    this.user
      ? this.$router.push({ path: '/' })
      : this.$router.push({ path: '/login' })
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.user
    })
  }
}
</script>
