<template lang="pug">
  v-dialog(
    v-model="editCategory"
    width="500"
  )
    template(v-slot:activator="{ on, attrs }")
      v-btn(
        v-bind="attrs"
        v-on="on"
        color="red"
        @click="editCategory = true"
      )
        v-icon mdi-circle-edit-outline
    v-card
      v-card-title(class="headline grey lighten-2")
        {{ $t('addNewCategory') }}

      v-divider

      v-form
        v-text-field(
          v-model="newName"
          label="Name"
          required
          solo
        )

      v-card-actions
        v-spacer
        v-btn(
          color="primary"
          text
          @click="updateCategory(newName)"
        )
          {{ $t('add') }}
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
