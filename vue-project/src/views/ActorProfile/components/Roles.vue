<template>
  <article class="mt-4" v-if="props?.movies?.length > 0">
    <OtherFilms
      v-if="films?.data"
      :films="films?.data.sort((a, b) => b.year - a.year)"
      text="Фильмы и сериалы"
    />

    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Участие в проектах</h2>

      <button
        @click="
          () => {
            rolesToggle = !rolesToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="rolesToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="d-flex flex-wrap overflow-hidden align-items-start ps-4 m-0 justify-content-between"
      :style="{ maxHeight: rolesToggle ? '250px' : '100%' }"
    >
      <li v-for="movie in films.data" :key="movie.id" class="p-0 role">
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-white"
          >{{ movie.name || movie.alternativeName }}

          <span class="text-secondary">{{ movie.description && ', ' + movie.description }}</span>
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script setup>
import axios from 'axios'
import options from '@/options.json'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import OtherFilms from '@/views/FilmProfile/components/OtherFilms.vue'
import { onMounted, reactive, ref, watch } from 'vue'

var rolesToggle = ref(true)

var films = reactive({
  data: []
})

const props = defineProps({
  movies: Array
})

var getFilms = async (array) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&${array?.map((el) => `&id=${el}`).join('')}`,
    options['request1']
  )

  films.data = response.data.docs.map(
    (element) =>
      (element = {
        id: element.id,
        name: element.name || element.alternativeName,
        image: element?.poster?.url?.replace('orig', 'x120') || '',
        year: element.year
      })
  )
}

watch(props, async (newValue) => {
  getFilms(newValue.movies)
})

onMounted(() => {
  getFilms(props.movies)
})
</script>

<style scoped>
.role {
  flex: 1 1 400px;
}
</style>
