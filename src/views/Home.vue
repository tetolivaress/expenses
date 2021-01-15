<template>
  <div class="home">
    <ExpenseList/>
    <HelloWorld/>
  </div>
</template>

<script>

import ExpenseList from '@/components/ExpenseList.vue'
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',
  components: {
    ExpenseList,
    HelloWorld
  }
}
</script>
