<template>
  <div class="d-flex flex-column" style="width: 300px">
    <div class="input-button-container rounded-3 border border-danger p-1">
      <input
        v-model="search"
        type="text"
        placeholder="Введите запрос..."
        class="text-white text-decoration-none"
      />
      <button @click="searchButton" type="button"><Search /></button>
    </div>

    <div class="dropdown w-100">
      <ul class="dropdown-menu w-100" :class="{ 'd-block': show }">
        <li v-for="film in resultQuery.data" :key="film.id">
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
var resultQuery = reactive({ data: [] })

var getQuery = async (query) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${encodeURI(query)}`,
    options['request1']
  )

  resultQuery.data = response.data.docs.map(
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
  show.value = !show.value
  getQuery(search.value)
}
</script>

<style scoped>
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
</style>
