<template>
  <v-dialog
    v-model="editCategory"
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
        @click="editCategory = true"
      >
        <v-icon>mdi-edit</v-icon>
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
          @click="updateCategory(newName)"
          v-if="!category.categories.filter(category => category.name == name).length"
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
  props: ['category'],
  data () {
    return {
      editCategory: false,
      newName: {}
    }
  },
  watch: {
    category (newName) {
      this.newName = newName
    }
  },
  methods: {
    ...mapActions('category', ['updateCategory'])
  }
}
</script>
