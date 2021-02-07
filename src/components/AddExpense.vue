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
        <v-date-picker
          v-model="picker"
          v-if="openDatePicker"
          @input="openDatePicker = !openDatePicker, date = $event"
        ></v-date-picker>
        <div v-else @click="openDatePicker = !openDatePicker">
          {{ date }}
        </div>
        <v-icon
          color="green"
          class="mx-6"
          @click="openDatePicker = !openDatePicker"
        >
          mdi-circle-edit-outline
        </v-icon>
      </v-card-title>

      <v-divider></v-divider>

      <v-form v-show="!openDatePicker">
        <v-container>
          <v-select
            :hint="`${filteredCategories.name}, ${filteredCategories.id}`"
            :items="filteredCategories"
            item-text="name"
            item-value="id"
            label="Solo field"
            solo
            v-model="selectedCategory"
          >
            <template v-slot:append-outer>
              <router-link to="/category">
                <v-icon>
                  mdi-circle-edit-outline
                </v-icon>
              </router-link>
            </template>
          </v-select>
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
                solo
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
                solo
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
          @click="addExpense({ description, amount, userId: user.id, date: picker, categoryId: selectedCategory }), newExpense = false, description = '', amount = ''"
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
  name: 'AddExpense',

  data: () => ({
    selectedCategory: '',
    searchCategory: '',
    date: new Date(),
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
      await this['expense/addExpense'](expense)
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    }
  }
}
</script>
