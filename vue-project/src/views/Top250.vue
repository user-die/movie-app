<template>
  <div class="d-flex flex-column gap-2 justify-content-between" style="min-height: 120vh">
    <main>
      <h1 class="text-white m-0">250 Лучших фильмов</h1>

      <div class="d-flex align-items-center justify-content-start my-3 gap-3">
        <label class="text-white fs-4" for="inp"> По версии</label>
        <BFormSelect
          id="inp"
          v-model="version"
          :options="versions"
          class="bg-dark border-danger w-25"
        />
      </div>

      <article class="row row-gap-3">
        <FilmCard
          v-for="film in films.data"
          :key="film.id"
          :item="film"
          style="width: 270px"
        ></FilmCard>
      </article>
    </main>

    <div ref="observerRef" class="observer"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import options from '../options.json'
import FilmCard from '@/components/FilmCard.vue'
import { BFormSelect } from 'bootstrap-vue-next'

const observerRef = ref(null)
const films = reactive({ data: [] })
const page = ref(1)
const version = ref('kp')
const versions = [
  { value: 'kp', text: 'Кинопоиск' },
  { value: 'imdb', text: 'IMDb' },
  { value: 'filmCritics', text: 'Зарубежных критиков' }
]

async function getTop250(page, version) {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=10&sortField=rating.${version}&sortType=-1&lists=top250`,
    options
  )

  films.data = [...films.data, ...response.data.docs]
}

watch(version, async (newValue) => {
  films.data = []
  getTop250(1, newValue)
})

onMounted(() => {
  getTop250(1, version.value)

  var options = {
    rootMargin: '0px',
    threshold: 1.0
  }

  var callback = (entries) => {
    if (entries[0].isIntersecting && page.value < 250) {
      page.value++
      getTop250(page.value, version.value)
    }
  }

  var observer = new IntersectionObserver(callback, options)
  observer.observe(observerRef.value)
})
</script>

<style scoped></style>
