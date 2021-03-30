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
          template(
            v-for="(investment, j) in sortedInvestments"
          )
            v-list-item(
              v-if="sortedInvestments.length"
              :key="j"
            )
              v-list-item-avatar(@click="selectedInvestment = investment, openModal = true")
                v-icon(
                  class="grey lighten-1"
                  dark
                ) mdi-folder
              v-list-item-content(@click="selectedInvestment = investment, openModal = true")
                v-list-item-title(v-text="investment.description")
                v-list-item-subtitle(v-text="investment.amount")
                v-list-item-subtitle(v-text="$moment(investment.date).format('dddd D MMMM YYYY')")
              v-list-item-action
                v-btn(icon @click="removeInvestment(investment)")
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
            @input="openDatePicker = !openDatePicker, selectedInvestment.date = $event"
          )
          div(v-else @click="openDatePicker = !openDatePicker")
            | {{ selectedInvestment.date ? $moment(selectedInvestment.date).format('DD - MMMM') : $moment().format('DD - MMMM') }}
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
                v-text-field(
                  v-model="selectedInvestment.description"
                  :counter="10"
                  :label="$t('description')"
                  required
                )

              v-col(
                cols="12"
                md="4"
              )
                v-text-field(
                  v-model="selectedInvestment.amount"
                  :counter="10"
                  :label="$t('amount')"
                  required
                )

        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            text
            @click="updateInvestment(selectedInvestment), openModal = false"
          )
            |  {{ $t('update') }}
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedInvestment: {
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
      sortedInvestments: 'investment/sortedInvestments',
      withoutCategory: 'investment/withoutCategory',
      spent: 'investment/spent'
    })
  },
  methods: {
    ...mapActions('investment', ['removeInvestment', 'updateInvestment']),
    spentCategory (investment) {
      return investment
        .map(investment => Number(investment.amount))
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
      await this.$store.dispatch('investment/bindInvestments')
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    } catch (error) {
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    }
  }
}
</script>
