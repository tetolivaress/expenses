<template lang="pug">
  v-dialog(
    v-model="newCategory"
    width="500"
  )
    template(v-slot:activator="{ on, attrs }")
      v-btn(
        v-bind="attrs"
        v-on="on"
        fab
        large
        dark
        bottom
        right
        fixed
        class="mb-12"
        color="primary"
      )
        v-icon mdi-plus
    v-card
      v-card-title(class="headline grey lighten-2")
        | {{ $t('addNewCategory') }}

      v-divider

      v-form(ref="form" @input="formHasError = $event")
        v-text-field(
          v-model="name"
          label="Name"
          required
          solo
          :rules="[nameRule]"
        )

      v-card-actions(v-if="formHasError")
        v-spacer
        v-btn(
          color="primary"
          text
          @click="addCategory(name)"
          v-if="!categoryExists"
        )
          | {{ $t('add') }}
</template>
<script>
import { mapActions, mapState } from 'vuex'
import validationTextsMixin from '../../mixins/validationTextsMixin'
export default {
  name: 'AddCategory',
  mixins: [validationTextsMixin],
  data: () => ({
    name: '',
    newCategory: false,
    formHasError: true
  }),
  computed: {
    ...mapState(['category']),
    nameRule () {
      return v => !v.length ? this.$t('validations.required', { field: 'Name' }) : true
    },
    categoryExists () {
      return this.category.categories.filter(category => category.name.toLowerCase() === this.name.toLowerCase()).length
    }
  },
  methods: {
    ...mapActions(['category/addCategory']),
    async addCategory (category) {
      if (this.$refs.form.validate()) {
        await this['category/addCategory'](category)
        this.newCategory = false
        this.$store.commit('loading/SET_LOADING', false, { root: true })
      }
    },
    validate () {
      console.log(this.$refs.form.validate())
    }
  }
}
</script>
