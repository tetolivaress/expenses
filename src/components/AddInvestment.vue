<template lang="pug">
  v-dialog(
    v-model="newInvestment"
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

      v-form(v-show="!openDatePicker" @input="formHasError = $event" @submit.prevent.click="addInvestment({ description, amount, userId: user.id, date: picker, categoryId: selectedCategory }), newInvestment = false, description = '', amount = ''" ref="investmentForm")
        v-container
          v-row
            v-col(
              cols="12"
              md="8"
            )
              v-text-field(
                v-model="description"
                :label="$t('description')"
                :rules="descriptionRules"
                solo
              )

            v-col(
              cols="12"
              md="4"
            )
              v-text-field(
                v-model="amount"
                :label="$t('amount')"
                solo
                :rules="numberRules"
                @update:error="formError = true"
                @change="formError = false"
              )

      v-card-actions(v-if="formHasError")
        v-spacer
        v-btn(
          color="primary"
          text
          v-if="!openDatePicker"
        )
          | {{ $t('add') }}
</template>
<script>
import { mapActions, mapState } from 'vuex'
import validationTextsMixin from '../mixins/validationTextsMixin'
export default {
  name: 'AddInvestment',
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
    newInvestment: false
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
    },
    descriptionRules () {
      return [v => !!v || this.$t('validations.required', { field: this.descriptionText })]
    },
    numberRules () {
      return [
        v => v.trim() || this.$t('validations.required', { field: this.amountText }),
        v => !isNaN(parseFloat(v)) || this.$t('validations.range', { field: this.amountText, min: 0, max: 999999999 }),
        v => (v >= 0 && v <= 999999999) || this.$t('validations.range', { field: this.amountText, min: 0, max: 999999999 })
      ]
    }
  },
  methods: {
    ...mapActions(['investment/addInvestment']),
    async addInvestment (investment) {
      await this['investment/addInvestment'](investment)
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    },
    moment (date) {
      return date ? this.$moment(date) : this.$moment()
    }
  }
}
</script>
