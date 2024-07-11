<template>
  <article style="height: 500px">
    <router-link class="d-flex align-items-center text-decoration-none gap-3">
      <h2 class="text-white m-0">{{ title }}</h2>
      <BButton class="bg-dark border-danger"><Chevron /></BButton>
    </router-link>

    <article class="d-flex flex-wrap gap-5">
      <FilmCard
        v-for="film in filmList"
        :key="film.id"
        :item="film"
        style="width: 270px"
      ></FilmCard>
    </article>
  </article>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next'
import FilmCard from './FilmCard.vue'
import Chevron from '~icons/bi/chevron-right'

defineProps({
  filmList: Array,
  title: String
})
</script>

<style scoped></style>
