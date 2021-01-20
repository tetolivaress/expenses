<template>
  <div class="home">
    <ExpenseList/>
    <AddExpense/>
  </div>
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
