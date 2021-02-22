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
        <template v-slot:extension>
          <v-tabs v-if="user.user" align-with-title class="d-none d-md-block">
            <v-tab>Expenses</v-tab>
            <v-tab>Incomes</v-tab>
            <v-tab>Investiments</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto mt-16"
        max-height="90vh"
      >
        <router-view class="mt-16 pt-8"/>
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
        <v-btn>
          <span>Expenses</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn>
          <span>Incomes</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn>
          <span>Investiments</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
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

export default {
  name: 'App',
  data: () => ({
    description: '',
    amount: 0,
    newExpense: false,
    selectedExpense: 0
  }),
  computed: mapState({
    ...mapState(['expenses', 'loading', 'user']),
    ...mapGetters(['spent'])
  }),
  methods: {
    ...mapActions(['removeExpense', 'updateExpense']),
    logout () {
      this.$store.dispatch('user/logout')
        .then(() => this.$router.push({ path: '/login' }))
    }
  }
}
</script>
