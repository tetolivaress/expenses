<template lang="pug">
  v-container
    v-row
      v-col(
        cols="12"
        md="8"
        lg="4"
      )
        v-list(
          subheader
          two-line
        )
          v-list-group(
            :value="false"
            prepend-icon="mdi-account-circle"
            v-if="withoutCategory.length"
          )
            template(v-slot:activator)
              v-list-item-title
                v-badge(
                  color="red"
                  :content="withoutCategory.length"
                )
                  |  {{ $t('noCategory') }} - {{ spentCategory(withoutCategory) }}
            template(v-if="withoutCategory.length")
              v-list-item(
                v-for="(expense, j) in withoutCategory"
                :key="j"
              )
                v-list-item-avatar(@click="selectedExpense = expense, openModal = true")
                  v-icon(
                    class="grey lighten-1"
                    dark
                  ) mdi-folder
                v-list-item-content(@click="selectedExpense = expense, openModal = true")
                  v-list-item-title(v-text="expense.description")
                  v-list-item-subtitle(v-text="expense.amount")
                  v-list-item-subtitle(v-text="$moment(expense.date).format('dddd D MMMM YYYY')")
                v-list-item-action
                  v-btn(icon @click="removeExpense(expense)")
                    v-icon(color="red lighten-1") mdi-close

          v-list-group(
            :value="false"
            v-for="(category, i) in sortedExpenses"
            :key="i"
          )
            template(v-slot:activator)
              v-list-item
                v-list-item-avatar(@click="selectedExpense = expense, openModal = true")
                  v-img(
                    :src="category.url"
                    v-if="category.url"
                  )
                  v-icon(
                    class="grey lighten-1"
                    dark
                    v-else
                  ) mdi-folder
                v-badge(
                  color="red"
                  :content="category.expenses.length"
                  v-if="category.expenses.length"
                ) {{ category.category }} - {{ spentCategory(category.expenses) || 0 }}
                div(v-else) {{ category.category }}
            template(
              v-for="(expense, j) in category.expenses"
            )
              v-list-item(
                v-if="category.expenses.length"
                :key="j"
              )
                v-list-item-content(@click="selectedExpense = expense, openModal = true")
                  v-list-item-title(v-text="expense.description")
                  v-list-item-subtitle(v-text="expense.amount")
                  v-list-item-subtitle(v-text="$moment(expense.date).format('dddd D MMMM YYYY')")
                v-list-item-action
                  v-btn(icon @click="removeExpense(expense)")
                    v-icon( color="red lighten-1") mdi-close
    v-dialog(
      v-model="openModal"
      width="500"
    )
      v-card
        v-card-title(class="headline grey lighten-2")
          v-date-picker(
            v-model="picker"
            v-if="openDatePicker"
            @input="openDatePicker = !openDatePicker, selectedExpense.date = $event"
          )
          div(v-else @click="openDatePicker = !openDatePicker")
            | {{ selectedExpense.date ? $moment(selectedExpense.date).format('DD - MMMM') : $moment().format('DD - MMMM') }}
          v-icon(
            color="green"
            class="mx-6"
            @click="openDatePicker = !openDatePicker"
            v-if="!openDatePicker"
          ) mdi-circle-edit-outline

        v-form
          v-container
            v-row
              v-col(
                cols="12"
                md="8"
              )
                v-select(
                  :hint="`${categories.name}, ${categories.id}`"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  :label="$t('category')"
                  solo
                  v-model="selectedExpense.categoryId"
                )
                  template(v-slot:append-outer)
                    router-link(to="/category")
                      v-icon mdi-circle-edit-outline
                v-text-field(
                  v-model="selectedExpense.description"
                  :counter="10"
                  :label="$t('description')"
                  required
                )

              v-col(
                cols="12"
                md="4"
              )
                v-text-field(
                  v-model="selectedExpense.amount"
                  :counter="10"
                  :label="$t('amount')"
                  required
                )

        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            text
            @click="updateExpense(selectedExpense), openModal = false"
          )
            |  {{ $t('update') }}
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedExpense: {
        description: '',
        amount: '',
        date: '',
        categoryId: ''
      },
      openModal: false,
      openDatePicker: false,
      picker: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.user,
      categories: ({ category }) => category.categories
    }),
    ...mapGetters({
      sortedExpenses: 'expense/sortedExpenses',
      withoutCategory: 'expense/withoutCategory',
      spent: 'expense/spent'
    })
  },
  methods: {
    ...mapActions('expense', ['removeExpense', 'updateExpense']),
    spentCategory (expenses) {
      return expenses
        .map(expense => Number(expense.amount))
        .reduce((acc, current) => acc + current, 0)
        .toFixed(2)
    },
    moment (date) {
      return date ? this.$moment(date) : this.$moment()
    }
  },
  async created () {
    this.$store.commit('loading/SET_LOADING', true, { root: true })
    try {
      await this.$store.dispatch('category/bindCategories')
      await this.$store.dispatch('expense/bindExpenses')
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    } catch (error) {
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    }
  }
}
</script>
