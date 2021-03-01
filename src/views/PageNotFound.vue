<template lang="pug">
  h1 {{ $t('notFound') }}
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
