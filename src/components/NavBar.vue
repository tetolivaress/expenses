<template lang="pug">
  v-app-bar(color='blue lighten-5' elevate-on-scroll='')
    v-app-bar-nav-icon
    v-toolbar-title VExpenses
    v-spacer
    router-link(to='/' v-if='user.user')
      v-btn(icon='')
        v-icon mdi-home
    router-link(to='/login' v-if='!user')
      v-btn(icon='')
        v-icon mdi-login
    v-btn(v-else='' icon='' @click='logout')
      v-icon mdi-logout

</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ path: '/login' }))
    }
  }
}
</script>
