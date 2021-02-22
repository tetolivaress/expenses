<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        lg="4"
      >
        <v-list
          subheader
          two-line
        >
          <v-list-item>
            <v-list-item-content>
              {{ $t('spentIn', { month: moment().format('MMMM') }) }} : {{ spent }}
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            :value="false"
            prepend-icon="mdi-account-circle"
            v-if="withoutCategory.length"
          >
            <template v-slot:activator>
              <v-list-item-title>
                <v-badge
                  color="red"
                  :content="withoutCategory.length"
                >
                  {{ $t('noCategory') }} - {{ spentCategory(withoutCategory) }}
                </v-badge>
              </v-list-item-title>
            </template>
            <template v-if="withoutCategory.length">
              <v-list-item
                v-for="(expense, j) in withoutCategory"
                :key="j"
              >
                <v-list-item-avatar @click="selectedExpense = expense, openModal = true">
                  <v-icon
                    class="grey lighten-1"
                    dark
                  >
                    mdi-folder
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="selectedExpense = expense, openModal = true">
                  <v-list-item-title v-text="expense.description"></v-list-item-title>
                  <v-list-item-subtitle v-text="expense.amount"></v-list-item-subtitle>
                  <v-list-item-subtitle v-text="moment(expense.date).format('dddd D MMMM YYYY')"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removeExpense(expense)">
                    <v-icon color="red lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>

          </v-list-group>
          <v-list-group
            :value="false"
            prepend-icon="mdi-account-circle"
            v-for="(category, i) in sortedExpenses"
            :key="i"
          >
            <template v-slot:activator>
              <v-list-item-title>
                <v-badge
                  color="red"
                  :content="category.expenses.length"
                  v-if="category.expenses.length"
                >
                  {{ category.category }} - {{ spentCategory(category.expenses) || 0 }}
                </v-badge>
                <div v-else>
                  {{ category.category }}
                </div>
              </v-list-item-title>
            </template>
            <template
              v-for="(expense, j) in category.expenses"
            >
              <v-list-item
                v-if="category.expenses.length"
                :key="j"
              >
                <v-list-item-avatar @click="selectedExpense = expense, openModal = true">
                  <v-icon
                    class="grey lighten-1"
                    dark
                  >
                    mdi-folder
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="selectedExpense = expense, openModal = true">
                  <v-list-item-title v-text="expense.description"></v-list-item-title>
                  <v-list-item-subtitle v-text="expense.amount"></v-list-item-subtitle>
                  <v-list-item-subtitle v-text="moment(expense.date).format('dddd D MMMM YYYY')"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removeExpense(expense)">
                    <v-icon color="red lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog
      v-model="openModal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          <v-date-picker
            v-model="picker"
            v-if="openDatePicker"
            @input="openDatePicker = !openDatePicker, selectedExpense.date = $event"
          ></v-date-picker>
          <div v-else @click="openDatePicker = !openDatePicker">
            {{ selectedExpense.date ? moment(selectedExpense.date).format('DD - MMMM') : moment().format('DD - MMMM') }}
          </div>
          <v-icon
            color="green"
            class="mx-6"
            @click="openDatePicker = !openDatePicker"
            v-if="!openDatePicker"
          >
            mdi-circle-edit-outline
          </v-icon>
        </v-card-title>

        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-select
                  :hint="`${categories.name}, ${categories.id}`"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  :label="$t('category')"
                  solo
                  v-model="selectedExpense.categoryId"
                >
                  <template v-slot:append-outer>
                    <router-link to="/category">
                      <v-icon>
                        mdi-circle-edit-outline
                      </v-icon>
                    </router-link>
                  </template>
                </v-select>
                <v-text-field
                  v-model="selectedExpense.description"
                  :counter="10"
                  :label="$t('description')"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="selectedExpense.amount"
                  :counter="10"
                  :label="$t('amount')"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="updateExpense(selectedExpense), openModal = false"
          >
            {{ $t('update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

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
      return expenses.length
        ? expenses
          .map(expense => Number(expense.amount))
          .reduce((acc, current) => acc + current)
        : false
    },
    moment (date) {
      return date ? moment(date) : moment()
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
