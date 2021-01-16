<template>
  <div class="home">
    <ExpenseList/>
    <HelloWorld/>
  </div>
</template>

<script>

import Store from '../store'
import ExpenseList from '@/components/ExpenseList.vue'
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',
  components: {
    ExpenseList,
    HelloWorld
  },
  created () {
    Store.dispatch('bindExpenses')
  }
}
</script>
