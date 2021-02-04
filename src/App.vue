<template>
  <v-app>
    <div id="app">
      <NavBar/>
      <router-view/>
    </div>
    <v-overlay
      :absolute="true"
      :value="loading.isLoading"
    >
      <v-progress-circular
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    description: '',
    amount: 0,
    newExpense: false,
    selectedExpense: 0
  }),
  computed: mapState({
    ...mapState(['expenses', 'loading']),
    ...mapGetters(['spent'])
  }),
  methods: {
    ...mapActions(['removeExpense', 'updateExpense'])
  }
}
</script>
