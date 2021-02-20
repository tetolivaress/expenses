<template>
  <v-app-bar
    fixed
    color="blue lighten-5"
    elevate-on-scroll
  >
    <v-icon color="blue" class="mx-4">mdi-minus-circle</v-icon>
    <v-toolbar-title>VExpenses</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu
      offset-y
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-translate</v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="lang in langs"
          :key="lang"
          @click="$i18n.locale = lang"
        >
          <v-list-item-title>{{ lang }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
  data () {
    return {
      langs: ['en', 'es']
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
        .then(() => this.$router.push({ path: '/login' }))
    },
    setLanguage (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
