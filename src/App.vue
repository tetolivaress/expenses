<template>
  <v-app>
    <div v-for="(expense, i) in expenses" :key="i">
      <span>{{ expense}}</span>
    </div>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState, mapActions } from 'vuex'
import Store from './store/index'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  }),
  computed: mapState({
    ...mapState(['expenses'])
  }),
  methods: {
    ...mapActions(['bindExpenses'])
  },
  created () {
    Store.dispatch('bindExpenses')
  }
}
</script>
