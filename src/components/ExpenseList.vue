<template lang="pug">
  v-container
    v-row
      | {{ spent }}
    v-row
      v-col(cols='12' md='8' lg='4')
        v-list(subheader='' two-line='')
          v-list-item(v-for='(expense, i) in expenses' :key='i')
            v-list-item-avatar(@click='selectedExpense = expense, openModal = true')
              v-icon.grey.lighten-1(dark='')
                | mdi-folder

            v-list-item-content(@click='selectedExpense = expense, openModal = true')
              v-list-item-title(v-text='expense.description')
              v-list-item-subtitle(v-text='expense.amount')
              v-list-item-subtitle(v-text='expense.date')
            v-list-item-action
              v-btn(icon='' @click='removeExpense(expense)')
                v-icon(color='red lighten-1') mdi-close
    v-dialog(v-model='openModal' width='500')
      v-card
        v-card-title.headline.grey.lighten-2
          | Update Expense
        v-divider
        v-form
          v-container
            v-row
              v-col(cols='12' md='8')
                v-text-field(v-model='selectedExpense.description' :counter='10' label='Description' required='')
              v-col(cols='12' md='4')
                v-text-field(v-model='selectedExpense.amount' :counter='10' label='Mount' required='')
        v-card-actions
          v-spacer
          v-btn(color='primary' text='' @click='updateExpense(selectedExpense), openModal = false')
            | Update
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedExpense: {
        description: '',
        amount: ''
      },
      openModal: false
    }
  },
  computed: {
    ...mapState(['expenses']),
    ...mapGetters(['spent'])
  },
  methods: {
    ...mapActions(['removeExpense', 'updateExpense'])
  },
  created () {
    this.$store.commit('setLoading', true)
    this.$store.dispatch('bindExpenses')
      .then(() => this.$store.commit('setLoading', false))
  }
}
</script>
