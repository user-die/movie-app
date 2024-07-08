<template>
  <Navbar />

  <div style="margin-left: 250px">
    <router-view class="p-4" />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import router from './router'

//localStorage.clear()
/*
const arr = Array.from({ length: 61 }, (_, i) => i + 1)

localStorage.setItem('favorites', JSON.stringify(arr))
*/
</script>

<style scoped></style>
