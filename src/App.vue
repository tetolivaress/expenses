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
            <v-subheader inset>Folders</v-subheader>

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

              <v-list-item-content>
                <v-list-item-title v-text="expense.description"></v-list-item-title>

                <v-list-item-subtitle v-text="expense.amount"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action @click="removeExpense(expense)">
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
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
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState, mapActions } from 'vuex'
import Store from './store/index'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  }),
  computed: mapState({
    ...mapState(['expenses'])
  }),
  methods: {
    ...mapActions(['removeExpense'])
  },
  created () {
    Store.dispatch('bindExpenses')
  }
}
</script>
