<template>
  <v-app>
    <div id="app">
      <v-app-bar
        absolute
        color="indigo darken-2"
        dark
        shrink-on-scroll
        prominent
        scroll-target="#scrolling-techniques"
        src="@/assets/background.jpg"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(36,113,163,.65), rgba(33,97,140,.65)"
          ></v-img>
        </template>
        <v-icon color="blue" class="mx-4">mdi-minus-circle</v-icon>
        <v-toolbar-title v-if="spent">{{ spent }}$: {{ $t('spentIn', { month: moment().format('MMMM') }) }}</v-toolbar-title>
        <v-toolbar-title v-else>Gastos</v-toolbar-title>

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
              @click="setLanguage(lang)"
            >
              <v-list-item-title>{{ lang }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          v-if="user.user"
          icon
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs v-if="user.user" align-with-title class="d-none d-md-block">
            <router-link to="/">
              <v-tab>Expenses</v-tab>
            </router-link>
            <router-link to="/income">
              <v-tab>Incomes</v-tab>
            </router-link>
            <router-link to="/investment">
              <v-tab>Investments</v-tab>
            </router-link>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto mt-16"
        max-height="90vh"
      >
        <div class="mt-16 pt-16">
          <router-view class="mt-8"/>
        </div>
      </v-sheet>
      <v-bottom-navigation
        v-if="user.user"
        class="d-md-none"
        absolute
        color="blue"
        hide-on-scroll
        horizontal
        scroll-target="#scroll-threshold-example"
        scroll-threshold="500"
      >
        <router-link to="/">
          <v-btn>
            <span>Expenses</span>

            <v-icon>mdi-history</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/income">
          <v-btn>
            <span>Incomes</span>

            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/investment">
          <v-btn>
            <span>Investments</span>

            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </router-link>
      </v-bottom-navigation>
    </div>
    <v-overlay
      :absolute="true"
      :value="loading.isLoading"
    >
      <v-progress-circular
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'App',
  data: () => ({
    description: '',
    amount: 0,
    newExpense: false,
    selectedExpense: 0,
    langs: ['en', 'es']
  }),
  computed: mapState({
    ...mapState(['expenses', 'loading', 'user']),
    ...mapGetters({
      spent: 'expense/spent'
    })
  }),
  methods: {
    ...mapActions(['removeExpense', 'updateExpense']),
    logout () {
      this.$store.dispatch('user/logout')
        .then(() => this.$router.push({ path: '/login' }))
    },
    setLanguage (lang) {
      this.$i18n.locale = lang
      moment.locale(lang)
    },
    moment (date) {
      return date ? moment(date) : moment()
    }
  }
}
</script>
