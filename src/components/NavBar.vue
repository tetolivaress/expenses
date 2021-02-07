<template>
  <v-app-bar
    fixed
    color="blue lighten-5"
    elevate-on-scroll
  >
    <v-icon color="blue" class="mx-4">mdi-minus-circle</v-icon>
    <v-toolbar-title>VExpenses</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="user"
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
      this.$store.dispatch('user/logout')
        .then(() => this.$router.push({ path: '/login' }))
    }
  }
}
</script>
