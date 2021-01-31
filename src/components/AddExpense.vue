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
      )
        v-icon mdi-plus
    v-card
      v-card-title(class="headline grey lighten-2") Add Expense
        v-date-picker(v-model="picker")
      v-divider
      v-form
        v-container
          v-row
            v-col(
              cols="12"
              md="8"
            )
              v-text-field(
                v-model="description"
                :counter="10"
                label="Description"
                required
              )

            v-col(
              cols="12"
              md="4"
            )
              v-text-field(
                v-model="amount"
                :counter="10"
                label="Mount"
                required
              )
      v-card-actions
        v-spacer
        v-btn(
          color="primary"
          text
          @click="addExpense({ description, amount, userId: user.user.id, date: picker }), newExpense = false, description = '', amount = ''"
        )
          | Add
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HelloWorld',

  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    description: '',
    amount: '',
    newExpense: false
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['addExpense'])
  }
}
</script>
