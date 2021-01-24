<template>
  <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>VExpenses</v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link to="/" v-if="user.user">
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/login" v-if="!user">
      <v-btn icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </router-link>
    <v-btn
      v-else
      icon
      @click="logout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
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
