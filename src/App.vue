<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
      </div>
      <router-view/>
    </div>

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
import { mapState, mapActions, mapGetters } from 'vuex'
import Store from './store/index'

export default {
  name: 'App',

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
