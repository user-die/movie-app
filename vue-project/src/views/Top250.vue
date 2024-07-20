<template>
  <div v-if="isError">
    <p class="fs-1 text-center">{{ errorMessage }}</p>
  </div>

  <div v-else class="container-lg mainBg p-4 d-flex flex-column justify-content-between mh100">
    <main class="d-grid">
      <h2 class="d-flex align-items-center gap-2 fs-1 fw-bold text-danger">
        <span>250 Лучших</span>
        <label class="d-none" for="select-by-type"></label>
        <select
          name="select-by-type"
          id="select-by-type"
          v-model="type"
          class="form-select bg-dark border-danger w-25 text-danger fs-4"
        >
          <option v-for="option in types" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </h2>

      <div class="d-flex align-items-center justify-content-start my-3 gap-3">
        <label class="text-white fs-4" for="select-by-version"> По версии</label>
        <select
          name="select-by-version"
          id="select-by-version"
          v-model="version"
          class="form-select bg-dark border-danger w-25 text-white"
        >
          <option v-for="option in versions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>

      <article class="row row-gap-3 list253px">
        <transition-group name="filmList">
          <FilmCard v-for="film in films.data" :key="film.id" :item="film" class="w253" />
        </transition-group>
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

const isError = ref(false)
const errorMessage = ref()

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
  ).catch((error) => {
    errorMessage.value = error.response.data.message.replace(
      "Чтобы получить больше запросов, обновите тариф в боте @kinopoiskdev_bot'",
      ''
    )
    isError.value = true
  })

  films.data = [
    ...films.data,
    ...response.data.docs.map(
      (element) =>
        (element = {
          id: element.id,
          name: element.name || element.alternativeName,
          image: element.poster.url.replace('orig', 'x390'),
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

<style>
option {
  font-family: Nunito;
}

.filmList-enter-active,
.filmList-leave-active {
  transition: all 0.3s ease-out;
}

.filmList-enter-from,
.filmList-leave-to {
  opacity: 0;
}
</style>
