<template lang="pug">
  v-app-bar(
    fixed
    color="blue lighten-5"
    elevate-on-scroll
  )
    v-icon(color="blue" class="mx-4") mdi-minus-circle
    v-toolbar-title VExpenses

    v-spacer
    v-menu(
      offset-y
    )
      template(v-slot:activator="{ on, attrs }")
        v-btn(
          icon
          v-bind="attrs"
          v-on="on"
        )
          v-icon mdi-translate
          v-icon mdi-chevron-down

      v-list
        v-list-item(
          v-for="lang in langs"
          :key="lang"
          @click="setLanguage(lang)"
        )
          v-list-item-title {{ lang }}
    v-btn(
      v-if="user"
      icon
      @click="logout"
    )
      v-icon mdi-logout
</template>
<script>
import { mapState } from 'vuex'
import moment from 'moment'
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
      moment.locale(lang)
    }
  }
}
</script>
