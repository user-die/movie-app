<template>
  <Navbar />

  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import router from './router'
</script>

<style scoped></style>
