<template>
  <v-container>
    <v-row>
      {{ spent }}
    </v-row>
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
          <v-list-item
            v-for="(expense, i) in expense.expenses"
            :key="i"
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
              <v-list-item-subtitle v-text="expense.date"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="removeExpense(expense)">
                <v-icon color="red lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog
      v-model="openModal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Update Expense
        </v-card-title>

        <v-divider></v-divider>

        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  v-model="selectedExpense.description"
                  :counter="10"
                  label="Description"
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
                  label="Mount"
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
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
    ...mapState(['expense']),
    ...mapGetters(['spent'])
  },
  methods: {
    ...mapActions(['removeExpense', 'updateExpense'])
  },
  created () {
    this.$store.commit('loading/SHOW_LOADING')
    this.$store.dispatch('category/bindCategories')
    this.$store.dispatch('expese/bindExpenses')
      .then(() => this.$store.commit('loading/HIDE_LOADING'))
  }
}
</script>
