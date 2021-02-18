<template>
  <v-dialog
    v-model="newExpense"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        fab
        large
        dark
        bottom
        right
        fixed
        color="primary"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        <v-date-picker
          v-model="picker"
          v-if="openDatePicker"
          @input="openDatePicker = !openDatePicker, date = $event"
        ></v-date-picker>
        <div v-else @click="openDatePicker = !openDatePicker">
          {{ date ? moment(date).format('DD - MMMM') : moment().format('DD - MMMM') }}
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

      <v-divider></v-divider>

      <v-form v-show="!openDatePicker" @input="formHasError = $event">
        <v-container>
          <v-select
            :hint="`${filteredCategories.name}, ${filteredCategories.id}`"
            :items="filteredCategories"
            item-text="name"
            item-value="id"
            :label="$t('category')"
            solo
            v-model="selectedCategory"
          >
            <template v-slot:append-outer>
              <router-link to="/category">
                <v-icon>
                  mdi-circle-edit-outline
                </v-icon>
              </router-link>
            </template>
          </v-select>
          <v-row>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                v-model="description"
                :label="$t('description')"
                required
                solo
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="amount"
                :label="$t('amount')"
                required
                solo
                :rules="[numberRule]"
                @update:error="formError = true"
                @change="formError = false"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card-actions v-if="formHasError">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          v-if="!openDatePicker"
          @click="addExpense({ description, amount, userId: user.id, date: picker, categoryId: selectedCategory }), newExpense = false, description = '', amount = ''"
        >
          {{ $t('add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'AddExpense',

  data: () => ({
    formHasError: true,
    selectedCategory: '',
    searchCategory: '',
    date: '',
    openDatePicker: false,
    picker: new Date().toISOString().substr(0, 10),
    description: '',
    amount: '',
    newExpense: false,
    numberRule: v => {
      if (!v.trim()) return true
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999999999) return true
      return 'Number has to be between 0 and 999999999'
    }
  }),
  computed: {
    ...mapState({
      user: ({ user }) => user.user,
      categories: ({ category }) => category.categories
    }),
    filteredCategories () {
      return this.categories.filter(
        (category) =>
          category.name.toLowerCase().indexOf(this.searchCategory.toLowerCase()) > -1
      )
    }
  },
  methods: {
    ...mapActions(['expense/addExpense']),
    async addExpense (expense) {
      await this['expense/addExpense'](expense)
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    },
    moment (date) {
      return date ? moment(date) : moment()
    }
  }
}
</script>
