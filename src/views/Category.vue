<template>
  <div class="home">
    <CategoryList/>
    <AddCategory/>
  </div>
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
