<template lang="pug">
  v-dialog(
    v-model="newExpense"
    width="500"
  )
    template(v-slot:activator="{ on, attrs }")
      v-btn(
        v-bind="attrs"
        v-on="on"
        fab
        large
        dark
        bottom
        right
        fixed
        color="primary"
        class="mb-12"
      )
        v-icon mdi-plus
    v-card
      v-card-title(class="headline grey lighten-2")
        v-date-picker(
          v-model="picker"
          v-if="openDatePicker"
          @input="openDatePicker = !openDatePicker, date = $event"
        )
        div(v-else @click="openDatePicker = !openDatePicker")
        | {{ date ? $moment(date).format('DD - MMMM') : $moment().format('DD - MMMM') }}
        v-icon(
          color="green"
          class="mx-6"
          @click="openDatePicker = !openDatePicker"
          v-if="!openDatePicker"
        ) mdi-circle-edit-outline

      v-divider

      v-form(v-show="!openDatePicker" @input="formHasError = $event" ref="expenseForm")
        v-container
          v-select(
            :hint="`${filteredCategories.name}, ${filteredCategories.id}`"
            :items="filteredCategories"
            item-text="name"
            item-value="id"
            :label="$t('category')"
            solo
            v-model="selectedCategory"
          )
            template(v-slot:append-outer)
              router-link(to="/category")
                v-icon mdi-circle-edit-outline
          v-row
            v-col(
              cols="12"
              md="8"
            )
              v-text-field(
                v-model="description"
                :label="$t('description')"
                required
                solo
                :rules="[descriptionRule]"
              )

            v-col(
              cols="12"
              md="4"
            )
              v-text-field(
                v-model="amount"
                :label="$t('amount')"
                required
                solo
                :rules="[requiredAmountRule, rangeRule, numberRule]"
                @update:error="formError = true"
                @change="formError = false"
              )

      v-card-actions(v-if="formHasError")
        v-spacer
        v-btn(
          color="primary"
          text
          v-if="!openDatePicker"
          @click="addExpense({ description, amount, userId: user.id, date: picker, categoryId: selectedCategory }), newExpense = false, description = '', amount = ''"
        )
          | {{ $t('add') }}
</template>
<script>
import { mapActions, mapState } from 'vuex'
import validationTextsMixin from '../mixins/validationTextsMixin'
export default {
  name: 'AddExpense',
  mixins: [validationTextsMixin],
  data: () => ({
    formHasError: true,
    selectedCategory: '',
    searchCategory: '',
    date: '',
    openDatePicker: false,
    picker: new Date().toISOString().substr(0, 10),
    description: '',
    amount: '',
    newExpense: false
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
      if (this.$refs.expenseForm.validate()) {
        await this['expense/addExpense'](expense)
        this.$store.commit('loading/SET_LOADING', false, { root: true })
      }
    },
    moment (date) {
      return date ? this.$moment(date) : this.$moment()
    }
  }
}
</script>
