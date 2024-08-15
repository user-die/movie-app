<template>
  <section class="mt-4" v-if="isFinished">
    <OtherFilms :films="data?.docs?.sort((a, b) => b?.year - a?.year)" text="Фильмы и сериалы" />

    <openListButton
      text="Участие в проектах"
      :length="data?.docs?.length"
      :toggle="toggle"
      @toggleList="() => (toggle = !toggle)"
    />

    <ul
      class="d-flex flex-wrap overflow-hidden align-items-start ps-4 m-0 justify-content-between"
      :style="{ maxHeight: toggle ? '250px' : '100%' }"
    >
      <li v-for="movie in data?.docs" :key="movie.id" class="p-0 role">
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-white"
          >{{ movie.name || movie.alternativeName }}

          <span class="text-secondary">{{ movie.description && ', ' + movie.description }}</span>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup>
import openListButton from '@/components/openListButton.vue'
import OtherFilms from '@/views/FilmProfile/components/OtherFilms.vue'
import { computed, ref } from 'vue'
import useFetch from '@/fetch'

var toggle = ref(true)

const props = defineProps({
  movies: Array
})

let url = computed(() => 'movie?page=1&limit=250' + props.movies.map((el) => `&id=${el}`).join(''))

const { data, isFinished, error, isError } = useFetch(url, {
  refetch: true
}).json()
</script>

<style scoped>
.role {
  flex: 1 1 400px;
}
</style>
