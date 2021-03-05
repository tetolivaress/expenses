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

      v-form
        v-text-field(
          v-model="name"
          label="Name"
          required
          solo
        )

      v-card-actions
        v-spacer
        v-btn(
          color="primary"
          text
          @click="addCategory(name)"
          v-if="!category.categories.filter(category => category.name == name).length"
        )
          | {{ $t('add') }}
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AddCategory',
  data: () => ({
    name: '',
    newCategory: false
  }),
  computed: {
    ...mapState(['category'])
  },
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
