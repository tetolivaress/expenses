<template lang="pug">
  div.home
    InvestmentList
    AddInvestment
</template>

<script>
import InvestmentList from '@/components/InvestmentList.vue'
import AddInvestment from '@/components/AddInvestment.vue'

export default {
  name: 'Investment',
  components: {
    InvestmentList,
    AddInvestment
  }
}
</script>
