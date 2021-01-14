<template>
  <v-app>
    <v-container

    >
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
            <v-subheader inset>{{ spent }}</v-subheader>

            <v-list-item
              v-for="(expense, i) in expenses"
              :key="i"
            >
              <v-list-item-avatar>
                <v-icon
                  class="grey lighten-1"
                  dark
                >
                  mdi-folder
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content @click="description = expense.description, amount = expense.amount, newExpense = true, selectedExpense = i">
                <v-list-item-title v-text="expense.description"></v-list-item-title>

                <v-list-item-subtitle v-text="expense.amount"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action @click="removeExpense(expense)">
                <v-btn icon>
                  <v-icon color="red lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <v-main>
      <HelloWorld/>
    </v-main>

    <v-dialog
      v-model="newExpense"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
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
                  v-model="description"
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
                  v-model="amount"
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
            @click="updateExpense({id: expenses[selectedExpense].id, description, amount}), newExpense = false, description = '', amount = ''"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState, mapActions, mapGetters } from 'vuex'
import Store from './store/index'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    description: '',
    amount: 0,
    newExpense: false,
    selectedExpense: 0
  }),
  computed: mapState({
    ...mapState(['expenses']),
    ...mapGetters(['spent'])
  }),
  methods: {
    ...mapActions(['removeExpense', 'updateExpense'])
  },
  created () {
    Store.dispatch('bindExpenses')
  }
}
</script>
