<template>
  <div class="d-flex flex-column">
    <input v-model="search" type="text" placeholder="Найти фильм..." class="form-select search" />

    <div class="dropdown w-100">
      <div
        :style="{ display: show ? 'block' : 'none' }"
        id="drop"
        class="dropdown-menu w-100 p-2 menu bg-dark"
        ref="drop"
      >
        <p class="text-center fs-4 m-0 text-white">Фильмы и сериалы</p>
        <ul class="list-unstyled">
          <li v-for="film in resultFilms.data.slice(0, 5)" :key="film.id" class="searchItem">
            <router-link
              :to="'/movie/' + film.id"
              class="p-2 d-flex h-100 text-decoration-none gap-2"
            >
              <img :src="film?.image" alt="" height="50px" />

              <div>
                <p class="text-white m-0">{{ film?.name }}</p>
                <p class="mb-0 mt-1">
                  <span class="text-warning">{{ film.rating?.kp?.toFixed(1) }}</span>
                  <span class="text-secondary mx-2">{{ film?.year }}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>

        <p class="text-center fs-4 m-0 text-white">Актёры и актрисы</p>
        <ul class="list-unstyled">
          <li v-for="actor in resultActors.data.slice(0, 5)" :key="actor.id" class="searchItem">
            <router-link
              :to="'/actor/' + actor.id"
              class="p-2 d-flex h-100 text-decoration-none gap-2"
            >
              <img :src="actor.image" alt="" height="50px" />

              <div>
                <p class="text-white m-0">{{ actor.name }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import options from '@/options.js'
import { reactive, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const drop = ref(null)
const show = ref(false)
var search = ref('')
var resultFilms = reactive({
  data: []
})
var resultActors = reactive({
  data: []
})

function close() {
  show.value = false
}

onClickOutside(drop, close)

var getArtistsQuery = async (query) => {
  let response = await axios(
    `https://kinopoiskapiunofficial.tech/api/v1/persons?name=${encodeURI(query)}&page=1`,
    options['request2']
  )

  resultActors.data = response.data.items.map(
    (element) =>
      (element = {
        id: element.kinopoiskId,
        name: element.nameRu,
        image: element.posterUrl
      })
  )

  show.value = true
}

var getFilms = async (query) => {
  let response = await axios(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURI(query)}&page=1`,
    options['request2']
  )

  resultFilms.data = response.data.films.map(
    (element) =>
      (element = {
        id: element?.filmId,
        name: element?.nameRu || element?.nameOriginal,
        image: element?.posterUrlPreview,
        year: element?.year,
        rating: {
          kp: element?.ratingKinopoisk,
          imdb: element?.ratingImdb
        }
      })
  )

  show.value = true
}

watch(search, async () => {
  getFilms(search.value)
  getArtistsQuery(search.value)
})
</script>

<style scoped lang="scss">
@use 'sass:map';
@import './../assets/styles/style.scss';

.menu {
  height: 600px;
  border-radius: 10px;
  overflow-y: scroll;
}

.search {
  background: url('@/assets/images/search.svg') no-repeat;
  background-position: 0 4px;
}

.searchItem:hover {
  background: #333030;
  border-radius: 5px;
}
</style>
