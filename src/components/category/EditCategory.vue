<template>
  <v-dialog
    v-model="editCategory"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="red"
        @click="editCategory = true"
      >
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ $t('addNewCategory') }}
      </v-card-title>

      <v-divider></v-divider>

      <v-form>
        <v-text-field
          v-model="newName"
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
        >
          {{ $t('add') }}
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
      newName: ''
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
