<template lang="pug">
  div.home
    ExpenseList
    AddExpense
</template>

<script>
import ExpenseList from '@/components/ExpenseList.vue'
import AddExpense from '@/components/AddExpense.vue'

export default {
  name: 'Home',
  components: {
    ExpenseList,
    AddExpense
  }
}
</script>
