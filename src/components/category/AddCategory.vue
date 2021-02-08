<template>
  <v-dialog
    v-model="newCategory"
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
        Add New Category
      </v-card-title>

      <v-divider></v-divider>

      <v-form>
        <v-text-field
          v-model="name"
          label="Name"
          required
          solo
        ></v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="addCategory(name)"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddCategory',
  data: () => ({
    name: '',
    newCategory: false
  }),
  methods: {
    ...mapActions(['category/addCategory']),
    async addCategory (category) {
      await this['category/addCategory'](category)
      this.newCategory = false
      this.$store.commit('loading/SET_LOADING', false, { root: true })
    }
  }
}
</script>
