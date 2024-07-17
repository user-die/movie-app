<template>
  <div class="container mainBg p-4 mh">
    <div class="mx-auto d-grid">
      <h2 class="fs-1 fw-bold text-danger">Мои закладки</h2>

      <div class="row mb-3">
        <div class="col-6">
          <label for="">Поиск по названию</label>
          <input
            id="input-default"
            class="form-control mt-2 bg-dark border-danger text-white"
            v-model="search"
          />
        </div>

        <div class="col-3">
          <label for="">Жанр</label>
          <select class="form-select mt-2 bg-dark border-danger text-white" v-model="genresInput">
            <option :value="null">Не выбрано</option>
            <option v-for="option in genres" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <div class="col-3">
          <label for="">Тип</label>
          <select class="form-select mt-2 bg-dark border-danger text-white" v-model="typeInput">
            <option :value="null">Не выбрано</option>
            <option v-for="option in types" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <article class="row row-gap-3 list">
        <FilmCard v-for="film in searchedFilms" :key="film.id" :item="film" class="w253"></FilmCard>

        <div
          class="mt-5 d-flex flex-row-reverse align-items-center justify-content-center"
          v-if="searchedFilms.length < 1"
        >
          <p class="fs-1">Ничего не найдено</p>
          <img src="./../assets/404.webp" alt="" />
        </div>
      </article>
    </div>

    <div ref="observerRef" class="observer"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import options from './../options.json'
import FilmCard from '@/components/FilmCard.vue'
import { reactive, onMounted, ref, watch, computed } from 'vue'
import store from '@/stores/index.js'
import { useHead } from '@unhead/vue'

const props = defineProps({
  list: String
})

useHead({
  title: 'Закладки',
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          `${props.list === 'wishlist' ? 'Сохранённые' : 'Избранные'} фильмы и сериалы. Поиск, фильтры по ним`
      )
    }
  ]
})

var listStore = store[props.list]()

const films = reactive({
  data: []
})

var search = ref('')
var typeInput = ref(null)
var genresInput = ref(null)

var types = [
  { value: 'movie', text: 'Фильм' },
  { value: 'tv-series', text: 'Сериал' },
  { value: 'cartoon', text: 'Мультфильм' },
  { value: 'animated-series', text: 'Мультсериал' },
  { value: 'anime', text: 'Аниме' }
]
var genres = [
  'Биография',
  'Боевик',
  'Вестерн',
  'Военный',
  'Детектив',
  'Детский',
  'Для взрослых',
  'Документальный',
  'Драма',
  'Игра',
  'История',
  'Комедия',
  'Концерт',
  'Короткометражка',
  'Криминал',
  'Мелодрама',
  'Музыка',
  'Мультфильм',
  'Мюзикл',
  'Новости',
  'Нуар',
  'Приключения',
  'Реальное ТВ',
  'Семейный',
  'Спорт',
  'Ток-шоу',
  'Триллер',
  'Ужасы',
  'Фантаскика',
  'Фэнтези',
  'Церемония'
]

var getFilms = async () => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&${listStore[props.list].data.map((el) => `&id=${el}`).join('')}`,
    options['request1']
  )

  films.data = [
    ...films.data,
    ...response.data.docs.map(
      (element) =>
        (element = {
          id: element.id,
          name: element.name,
          image: element?.poster?.url?.replace('orig', 'x390'),
          year: element.year,
          type: element.type,
          genres: element?.genres?.map((el) => el.name),
          rating: {
            kp: element?.rating?.kp,
            imdb: element?.rating?.imdb
          }
        })
    )
  ]
}

const filteredFilmsByGenre = computed(() =>
  genresInput.value === null
    ? films.data
    : films.data.filter((el) => el.genres.includes(genresInput?.value?.toLowerCase()))
)

const filteredFilmsByType = computed(() =>
  typeInput.value === null
    ? filteredFilmsByGenre.value
    : filteredFilmsByGenre.value.filter((el) => el.type == typeInput.value)
)

const searchedFilms = computed(() =>
  filteredFilmsByType.value.filter((film) =>
    film.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

watch(
  listStore[props.list],
  (newValue, oldValue) => {
    if (newValue.data.length > oldValue.data.length) getFilms()
    else films.data = films.data.filter((el) => newValue.data.includes(el.id))
  },
  { deep: true }
)

watch(
  props,
  (newValue) => {
    listStore = store[newValue.list]()
  },
  { deep: true }
)

onMounted(() => {
  getFilms()
})
</script>

<style scoped>
.mh {
  min-height: 100vh;
}

.w253 {
  width: 253px;
}

.list {
  width: round(down, 100%, 253px);
  justify-self: center;
}
</style>
