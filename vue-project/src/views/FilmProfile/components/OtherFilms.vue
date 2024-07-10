<template>
  <section class="row my-4" v-if="props.films.length">
    <h2 class="text-danger mb-3">{{ props.text }}</h2>
    <section class="d-flex gap-4 overflow-hidden" style="width: round(down, 100%, 144px)">
      <router-link
        v-for="sequel in props.films"
        :key="sequel.id"
        :to="'/movie/' + sequel.id"
        style="width: 120px"
        class="text-white text-decoration-none"
      >
        <img :src="sequel.poster?.url" alt="" class="actorsImage rounded-4" />
        <p class="mt-1 mb-0 text-center">{{ sequel.name }}</p>
        <p class="m-0 text-center">{{ sequel.year }}</p>
      </router-link>
    </section>
  </section>
</template>

<script setup>
const props = defineProps({
  text: String,
  films: Array
})
</script>

<style scoped></style>
