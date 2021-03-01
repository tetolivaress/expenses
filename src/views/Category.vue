<template lang="pug">
  div(class="home")
    CategoryList
    AddCategory
</template>

<script>
import CategoryList from '@/components/category/CategoryList'
import AddCategory from '@/components/category/AddCategory'

export default {
  components: {
    CategoryList,
    AddCategory
  }
}
</script>
