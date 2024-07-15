<template>
  <div
    class="container mainBg p-4 d-flex flex-column justify-content-between"
    style="min-height: 100vh"
  >
    <main>
      <h2 class="d-flex align-items-center gap-2 fs-1 fw-bold text-danger">
        <span>250 Лучших</span>
        <BFormSelect
          id="inp"
          v-model="type"
          :options="types"
          class="bg-dark border-danger w-25 text-danger fs-4"
        />
      </h2>

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
          style="width: 253px"
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
import { useHead } from '@unhead/vue'

useHead({
  title: 'Топ 250',
  meta: [
    {
      name: 'description',
      content: 'Топ фильмов и сериалов по версии Кинопоиск, imdb, кинокритиков'
    }
  ]
})

const observerRef = ref(null)
const films = reactive({
  data: []
})

const type = ref('top250')
const types = [
  {
    value: 'top250',
    text: 'фильмов'
  },
  { value: 'series-top250', text: 'сериалов' }
]

const page = ref(1)
const version = ref('kp')
const versions = [
  { value: 'kp', text: 'Кинопоиск' },
  { value: 'imdb', text: 'IMDb' },
  { value: 'filmCritics', text: 'Зарубежных критиков' }
]

var getTop250 = async (page, version, list) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=20&sortField=rating.${version}&sortType=-1&lists=${list}`,
    options['request1']
  )

  films.data = [
    ...films.data,
    ...response.data.docs.map(
      (element) =>
        (element = {
          id: element.id,
          name: element.name || element.alternativeName,
          image: element.poster.url,
          genres: element.genres.map((el) => el.name),
          year: element.year,
          rating: {
            kp: element.rating.kp,
            imdb: element.rating.imdb
          }
        })
    )
  ]
}

watch(type, async (newValue) => {
  films.data = []
  getTop250(1, version.value, newValue)
})

watch(version, async (newValue) => {
  films.data = []
  getTop250(1, newValue, type.value)
})

onMounted(() => {
  getTop250(1, version.value, type.value)

  var options = {
    rootMargin: '0px',
    threshold: 1.0
  }

  var callback = (entries) => {
    if (entries[0].isIntersecting && page.value < 250) {
      page.value++
      getTop250(page.value, version.value, type.value)
    }
  }

  var observer = new IntersectionObserver(callback, options)
  observer.observe(observerRef.value)
})
</script>

<style scoped>
option {
  font-family: Nunito;
}
</style>
