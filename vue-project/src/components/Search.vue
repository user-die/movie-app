<template>
  <div class="d-flex flex-column" style="width: 300px">
    <div class="input-button-container rounded-3 border border-danger p-1">
      <input
        v-model="search"
        type="text"
        placeholder="Введите запрос..."
        class="text-white text-decoration-none"
        @click="show = !show"
      />
      <button @click="searchButton" type="button"><Search /></button>
    </div>

    <div class="dropdown w-100">
      <div class="dropdown-menu w-100 p-2 menu" :class="{ 'd-block': show }">
        <p class="text-center fs-4 m-0">Фильмы и сериалы</p>
        <ul class="list-unstyled">
          <li v-for="film in resultFilms.data.slice(0, 5)" :key="film.id" class="searchItem">
            <router-link
              :to="'/movie/' + film.id"
              class="p-2 d-flex h-100 text-decoration-none gap-2"
            >
              <img :src="film.image" alt="" style="height: 50px" />

              <div>
                <p class="text-white m-0">{{ film.name }}</p>
                <p class="mb-0 mt-1">
                  <span class="text-warning">{{ film.rating.kp.toFixed(1) }}</span>
                  <span class="text-secondary mx-2">{{ film.year }}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>

        <p class="text-center fs-4 m-0">Актёры и актрисы</p>
        <ul class="list-unstyled">
          <li v-for="actor in resultActors.data.slice(0, 5)" :key="actor.id" class="searchItem">
            <router-link
              :to="'/actor/' + actor.id"
              class="p-2 d-flex h-100 text-decoration-none gap-2"
            >
              <img :src="actor.image" alt="" style="height: 50px" />

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
import options from '@/options.json'
import Search from '~icons/bi/search'
import { reactive, ref } from 'vue'

const show = ref(false)
var search = ref('')
var resultFilms = reactive({
  data: []
})
var resultActors = reactive({
  data: []
})

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
}

var getQuery = async (query) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURI(query)}`,
    options['request1']
  )

  resultFilms.data = response.data.docs.map(
    (element) =>
      (element = {
        id: element.id,
        name: element.name || element.alternativeName,
        image: element.poster.url,
        year: element.year,
        rating: {
          kp: element.rating.kp,
          imdb: element.rating.imdb
        }
      })
  )
}

var searchButton = () => {
  getQuery(search.value)
  getArtistsQuery(search.value)
}
</script>

<style scoped>
.menu {
  height: 600px;
  border-radius: 10px;
  overflow-y: scroll;
}

.input-button-container {
  display: flex;
}

.input-button-container input {
  flex-grow: 1;
  border: none;
  padding: 5px;
  outline: none;
}

.input-button-container button {
  background: #fff;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.searchItem:hover {
  background: #333030;
  border-radius: 5px;
}
</style>
