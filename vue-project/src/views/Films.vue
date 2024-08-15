<template>
  <div class="d-flex flex-column gap-3 p-4 align-items-center">
    <FilmsList :filmList="popularFilms.data" title="Популярные" />
    <FilmsList :filmList="mostViewed.data" title="Самые просматриваемые" />
    <FilmsList v-if="!props.isSeries" :filmList="inCinema.data" title="Сейчас в кино" />
    <FilmsList v-if="!props.isSeries" :filmList="latestFilms.data" title="Последние" />
    <FilmsList :filmList="bestsFilms.data" title="Лучшие" />
    <FilmsList v-if="!props.isSeries" :filmList="waiting.data" title="Ожидаемые" />
    <FilmsList :filmList="randomFilms.data" title="Случайные" />
  </div>

  <!-- 
   <nav class="localNav">
      <ul>
        <li>
          <a href="#about" :class="{ activeLink: hash === '#about' }">О фильме</a>
        </li>

        <li v-if="data?.description">
          <a href="#description" :class="{ activeLink: hash === '#description' }">Описание</a>
        </li>

        <li v-if="data?.watchability?.items.length > 0">
          <a href="#watch" :class="{ activeLink: intersection.watch }">Где посмотреть</a>
        </li>

        <li v-if="data?.persons">
          <a href="#actors" :class="{ activeLink: intersection.actors }">Актёры</a>
        </li>

        <li v-if="data?.persons">
          <a href="#staff">Стафф</a>
        </li>

        <li v-if="data?.persons">
          <a href="#dubbing">Актёры дубляжа</a>
        </li>

        <li>
          <a href="#awards" :class="{ activeLink: hash === '#awards' }">Награды</a>
        </li>

        <li>
          <a href="#nominations">Номинации</a>
        </li>

        <li v-if="data?.sequelsAndPrequels">
          <a href="#sequals">Другие части</a>
        </li>

        <li v-if="data?.similarMovies">
          <a href="#similar">Похожие</a>
        </li>

        <li>
          <a href="#cadrs">Кадры</a>
        </li>

        <li>
          <a href="#facts">Факты</a>
        </li>

        <li>
          <a href="#errors">Ошибки</a>
        </li>
      </ul>
    </nav>
   -->
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive, watch } from 'vue'
import FilmsList from '@/components/FilmsList.vue'
import options from '../options.js'
import { useHead } from '@unhead/vue'

const route = useRoute()

const props = defineProps({
  isSeries: Boolean
})

useHead({
  title: 'Фильмы',
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          `Большая подборка ${props.isSeries ? 'сериалов' : ' фильмов'}: популярные, самые просматриваемые, последние, сейчас в кино, лучшие, ожидаемые, случайные`
      )
    }
  ]
})

var popularFilms = reactive({ data: [] })
var bestsFilms = reactive({ data: [] })
var latestFilms = reactive({ data: [] })
var randomFilms = reactive({ data: [] })
var inCinema = reactive({ data: [] })
var waiting = reactive({ data: [] })
var mostViewed = reactive({ data: [] })

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

var year = new Date().getFullYear()
var month = new Date().toLocaleString('En', { month: 'long' })

async function getFilms(params, array) {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/${params}`, options['request1'])

  array.data = response.data.docs.map(
    (element) =>
      (element = {
        id: element.id,
        name: element.name || element.alternativeName,
        image: element?.poster?.url?.replace('orig', 'x390'),
        genres: element.genres.map((el) => el.name),
        year: element.year,
        rating: {
          kp: element.rating.kp,
          imdb: element.rating.imdb
        }
      })
  )
}

async function getFilms2(params, array) {
  let response = await axios(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films${params}`,
    options['request2']
  )

  array.data = response.data.items.map(
    (element) =>
      (element = {
        id: element.kinopoiskId,
        name: element.nameRu || element.nameOriginal,
        image: element.posterUrlPreview,
        genres: element.genres.map((el) => el.genre),
        year: element.year,
        rating: {
          kp: element.ratingKinopoisk,
          imdb: element.ratingImdb
        }
      })
  )
}

async function getRandomFilms() {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&isSeries=${props.isSeries}`,
    options['request1']
  )

  let randomPage = randomInteger(1, response.data.pages)

  getFilms(`movie?page=${randomPage}&limit=20&isSeries=${props.isSeries}`, randomFilms)
}

function getAllFilms() {
  getFilms2(
    `/collections?type=${props.isSeries ? 'POPULAR_SERIES' : 'TOP_POPULAR_MOVIES'}&page=1`,
    popularFilms
  )

  getFilms(
    `movie?page=1&limit=20&sortField=votes.kp&sortType=-1&isSeries=${props.isSeries}`,
    mostViewed
  )

  getFilms(
    'movie?page=1&limit=20&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&ticketsOnSale=true',
    inCinema
  )

  props.isSeries
    ? getFilms(
        `movie?page=1&sortField=year&sortType=-1&limit=20&lists=popular-series`,
        popularFilms
      )
    : getFilms2(
        `/premieres?year=${year}&month=${month.toUpperCase()}&page=1&isSeries=${props.isSeries}`,
        latestFilms
      )

  getFilms(`movie?page=1&limit=20&lists=${props.isSeries ? 'series-top250' : 'top250'}`, bestsFilms)

  getFilms(
    `movie?page=1&limit=20&sortField=votes.await&sortType=-1&lists=planned-to-watch-films&isSeries=${props.isSeries}`, //
    waiting
  )

  getRandomFilms()
}

onMounted(() => {
  getAllFilms()
})

watch(route, () => {
  getAllFilms()
})
</script>
