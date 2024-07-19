<template>
  <article class="list286">
    <div class="d-flex align-items-center text-decoration-none gap-3">
      <h2 class="text-white m-0">{{ title }}</h2>
      <button
        @click="
          () => {
            toggle = !toggle
          }
        "
        class="btn bg-dark border-danger text-danger"
      >
        <ChevronRight v-if="toggle" /> <ChevronDown v-else />
      </button>
    </div>

    <article class="d-flex flex-wrap gap-3 overflow-hidden mt-3" :class="{ h832: toggle }">
      <FilmCard v-for="film in filmList" :key="film.id" :item="film" class="w270"></FilmCard>
    </article>
  </article>
</template>

<script setup>
import FilmCard from './FilmCard.vue'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { ref } from 'vue'

var toggle = ref(true)

defineProps({
  filmList: Array,
  title: String
})
</script>
