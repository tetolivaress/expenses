<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        lg="4"
      >
        <v-list
          subheader
          two-line
        >
          <v-list-item
            v-for="(expense, i) in expenses"
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
              <v-list-item-title v-text="expense.description"></v-list-item-title>

              <v-list-item-subtitle v-text="expense.amount"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="red lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['expenses'])
  }
}
</script>
