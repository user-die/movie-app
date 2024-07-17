<template>
  <div class="d-grid h-75 justify-content-center align-content-center">
    <h1 class="text-center fs-1">404</h1>
    <p>Страница не найдена</p>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Страница не найдена',
  meta: [
    {
      name: 'description',
      content: 'Страница не найдена'
    }
  ]
})
</script>

<style scoped></style>
