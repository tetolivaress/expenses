<template>
  <v-list
    subheader
    two-line
  >
    <v-list-item
      v-for="(category, i) in categories"
      :key="i"
    >
      <v-list-item-avatar>
        <v-icon
          class="grey lighten-1"
          dark
        >
          mdi-folder
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="category.name"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="removeCategory(category)">
          <v-icon color="red lighten-1">mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: ({ user }) => user.user,
      categories: ({ category }) => category.categories
    })
  },
  methods: {
    ...mapActions('category', ['removeCategory', 'updateCategory'])
  }
}
</script>
