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
      v-card-title(class="headline grey lighten-2") {{ $t('editCategory') }}

      v-divider

      v-form(@input="formHasError = $event" ref="categoryForm")
        v-text-field(
          v-model="category.name"
          label="Name"
          required
          :rules="[nameRule]"
          solo
        )

        v-file-input(
          label="Logo"
          filled
          prepend-icon="mdi-camera"
          @change="file = $event"
        )

      v-card-actions(v-if="formHasError")
        v-spacer
        v-btn(
          color="primary"
          text
          @click="updateCategory({id: category.id, name: category.name, file}), editCategory = false"
        )
          | {{ $t('edit') }}
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['category'],
  data () {
    return {
      newName: '',
      editCategory: false,
      formHasError: true,
      file: null
    }
  },
  computed: {
    nameRule () {
      return v => !v.length ? this.$t('validations.required', { field: 'Name' }) : true
    }
  },
  watch: {
    category ({ name }) {
      this.newName = name
    }
  },
  methods: {
    ...mapActions('category', ['updateCategory']),
    submitCategory (category) {
      if (this.$refs.categoryForm.validate()) {
        this.updateCategory()
      }
    }
  }
}
</script>
