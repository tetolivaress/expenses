<template lang="pug">
  v-app
    div#app
      v-app-bar(
        absolute
        color="indigo darken-2"
        dark
        shrink-on-scroll
        prominent
        scroll-target="#scrolling-techniques"
        src="@/assets/background.jpg"
      )
        template(v-slot:img="{ props }")
          v-img(
            v-bind="props"
            gradient="to top right, rgba(36,113,163,.65), rgba(33,97,140,.65)"
          )
        v-icon(color="blue" class="mx-4") mdi-minus-circle
        v-toolbar-title(v-if="spent") {{ currentsTotal }}$: {{ $t('spentIn', { month: $moment().format('MMMM') }) }}
        v-toolbar-title(v-else) {{$t('expenses')}}

        v-select(
          :hint="`${months.name}, ${months.id}`"
          v-if="months.length"
          :items="months"
          item-text="name"
          item-value="id"
          label="Standard"
          solo
          @input="CHANGE_MONTH($event)"
        )

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
              v-icon(color="white") mdi-translate
              v-icon(color="white") mdi-chevron-down

          v-list
            v-list-item(
              v-for="lang in langs"
              :key="lang"
              @click="setLanguage(lang)"
            )
              v-list-item-title {{ lang }}

        v-btn(
          v-if="user.user"
          icon
          @click="logout"
        )
          v-icon mdi-logout
        template(v-slot:extension)
          v-tabs(v-if="user.user" align-with-title class="d-none d-md-block")
            router-link(to="/")
              v-tab {{ $t("expenses") }}
            router-link(to="/income")
              v-tab {{ $t("incomes") }}
            router-link(to="/investment")
              v-tab {{ $t("investments") }}
      v-sheet(
        id="scrolling-techniques"
        class="overflow-y-auto mt-16"
        max-height="90vh"
      )
        div(class="mt-16 pt-16")
          router-view(class="mt-8")
      v-bottom-navigation(
        v-if="user.user"
        class="d-md-none"
        absolute
        color="blue"
        hide-on-scroll
        horizontal
        scroll-target="#scroll-threshold-example"
        scroll-threshold="500"
      )
        v-btn(to="/")
          span {{ $t("expenses") }}

          v-icon mdi-history
        v-btn(to="/income")
          span {{ $t("incomes") }}

          v-icon mdi-heart

        v-btn(to="/investment")
          span {{ $t("investments") }}

          v-icon mdi-map-marker
    v-overlay(
      :absolute="true"
      :value="loading.isLoading"
    )
      v-progress-circular(
        indeterminate
        color="red"
      )
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    description: '',
    amount: 0,
    newExpense: false,
    selectedExpense: 0,
    langs: ['es', 'en']
  }),
  computed: mapState({
    ...mapState(['expenses', 'loading', 'user']),
    ...mapGetters({
      spent: 'expense/spent',
      invested: 'investment/invested',
      expensesMonths: 'expense/months',
      investmentsMonths: 'investment/months'
    }),
    currentsTotal () {
      switch (this.$route.name) {
        case 'Home': {
          return this.spent
        }
        case 'income': {
          return this.invested
        }
        case 'investment': {
          return this.invested
        }
        default: {
        }
      }
    },
    months () {
      switch (this.$route.name) {
        case 'Home': {
          return this.expensesMonths
        }
        case 'income': {
          return this.investmentsMonths
        }
        case 'investment': {
          return this.investmentsMonths
        }
        default: {
          return this.expensesMonths
        }
      }
    }
  }),
  methods: {
    ...mapActions(['removeExpense', 'updateExpense']),
    ...mapMutations({
      CHANGE_EXPENSES_MONTH: 'expense/CHANGE_MONTH',
      CHANGE_INVESTMENTS_MONTH: 'investment/CHANGE_MONTH'
    }),
    logout () {
      this.$store.dispatch('user/logout')
        .then(() => this.$router.push({ path: '/login' }))
    },
    setLanguage (lang) {
      this.$i18n.locale = lang
      this.$moment.locale(lang)
    },
    moment (date) {
      return date ? this.$moment(date) : this.$moment()
    },
    CHANGE_MONTH (event) {
      switch (this.$route.name) {
        case 'Home': {
          this.CHANGE_EXPENSES_MONTH(event)
          break
        }
        case 'investment': {
          this.CHANGE_INVESTMENTS_MONTH(event)
          break
        }
      }
    }
  }
}
</script>
