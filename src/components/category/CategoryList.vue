<template lang="pug">
  v-list(
    subheader
    two-line
  )
    <v-subheader inset>{{ $t('categories') }}</v-subheader>
    v-list-item(
      v-for="(category, i) in categories"
      :key="i"
    )
      v-list-item-avatar
        v-img(
          :src="category.url"
          v-if="category.url"
        )
        v-icon(
          class="grey lighten-1"
          dark
          v-else
        )
          | mdi-folder

      v-list-item-content
        v-list-item-title(v-text="category.name")

      v-list-item-action(v-if="!expenses.filter(expense => expense.categoryId == category.id).length")
        v-btn(icon @click="removeCategory(category)")
          v-icon(color="red lighten-1") mdi-close
      v-list-item-action(v-else)
        EditCategory(:category="category")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import EditCategory from '@/components/category/EditCategory'
export default {
  components: {
    EditCategory
  },
  data () {
    return {
      openModal: false
    }
  },
  computed: {
    ...mapState({
      expenses: ({ expense }) => expense.expenses,
      user: ({ user }) => user.user,
      categories: ({ category }) => category.categories
    })
  },
  methods: {
    ...mapActions('category', ['removeCategory', 'updateCategory'])
  }
}
</script>
