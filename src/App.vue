<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState } from 'vuex'

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
  })
}
</script>
