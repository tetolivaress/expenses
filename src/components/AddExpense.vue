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
        Add Expense <v-date-picker v-model="picker"></v-date-picker>
      </v-card-title>

      <v-divider></v-divider>

      <v-form>
        <v-container>
          <v-select
            :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
            label="Solo field"
            solo
          ></v-select>
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
          @click="addExpense({ description, amount, userId: user.user.id, date: picker }), newExpense = false, description = '', amount = ''"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
