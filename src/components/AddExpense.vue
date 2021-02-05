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
        <v-date-picker v-model="picker" v-if="openDatePicker" @input="openDatePicker = !openDatePicker, date = $event"></v-date-picker>
        <div v-else @click="openDatePicker = !openDatePicker">
          {{ date ? date : 'Change Date' }}
          {{filteredCategories.length}}</div>
      </v-card-title>

      <v-divider></v-divider>

      <v-form v-show="!openDatePicker">
        <v-container>
          <v-autocomplete
            :hint="`${filteredCategories.name}, ${filteredCategories.id}`"
            :items="filteredCategories"
            item-text="name"
            item-value="id"
            label="Solo field"
            solo
            @update:search-input="searchCategory = $event ? $event : ''"
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
                <v-icon v-if="filteredCategories.length > 1">
                  mdi-circle-edit-outline
                </v-icon>
                <v-icon
                  v-else-if="filteredCategories.length == 1"
                  color="red"
                >
                  mdi-wrench
                </v-icon>
                <v-icon
                  v-else
                  color="primary"
                >
                  mdi-cloud-upload
                </v-icon>
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
          {{filteredCategories.length}}
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
          @click="addExpense({ description, amount, userId: user.id, date: picker }), newExpense = false, description = '', amount = ''"
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
