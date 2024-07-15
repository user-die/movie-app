<template>
  <article>
    <div class="d-flex align-items-center text-decoration-none gap-3">
      <h2 class="text-white m-0">{{ title }}</h2>
      <BButton
        @click="
          () => {
            toggle = !toggle
          }
        "
        class="bg-dark border-danger"
      >
        <ChevronRight v-if="toggle" /> <ChevronDown v-else
      /></BButton>
    </div>

    <article class="d-flex flex-wrap gap-3 overflow-hidden mt-3" :class="{ height832: toggle }">
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
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { ref } from 'vue'

var toggle = ref(true)

defineProps({
  filmList: Array,
  title: String
})
</script>

<style scoped>
.height832 {
  height: 832px;
}
</style>
