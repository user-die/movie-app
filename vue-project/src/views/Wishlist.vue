<template>
  <div class="container-lg p-4 mh100">
    <div class="mx-auto d-grid">
      <div class="d-flex justify-content-between">
        <h1 class="fs-5 fw-bold text-blue">
          {{ props.list === 'wishlist' ? 'Мои закладки' : 'Избранное' }}
        </h1>

        <div>
          <button class="btn" :class="typeList && 'notActiveBtn'" @click="() => (typeList = false)">
            <Grid />
          </button>
          <button
            class="btn ml-2"
            @click="() => (typeList = true)"
            :class="!typeList && 'notActiveBtn'"
          >
            <List />
          </button>
        </div>
      </div>

      <div class="d-flex justify-content-between my-3">
        <div class="col-5">
          <label for="search-name">Поиск по названию</label>
          <input
            type="text"
            name="search-by-name"
            id="search-name"
            class="form-control mt-2"
            v-model="search"
          />
        </div>

        <div class="col-3">
          <label for="select-genre">Жанр</label>
          <select
            name="select-by-genre"
            id="select-genre"
            class="form-select mt-2"
            v-model="genresInput"
          >
            <option :value="null">Не выбрано</option>
            <option v-for="option in genres" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <div class="col-3">
          <label for="select-type">Тип</label>
          <select
            name="select-by-type"
            id="select-type"
            class="form-select mt-2"
            v-model="typeInput"
          >
            <option :value="null">Не выбрано</option>
            <option v-for="option in types" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <article class="row row-gap-3 list253px mt-2">
        <transition-group name="filmList">
          <FilmCard v-for="film in searchedFilms" :key="film.id" :item="film" class="w253" />
        </transition-group>

        <div v-if="isError">
          <p class="fs-1 text-center">{{ error }}</p>
        </div>

        <div
          class="mt-5 d-flex flex-row-reverse align-items-center justify-content-center"
          v-if="searchedFilms?.length < 1 && !isError"
        >
          <p class="fs-1">Ничего не найдено</p>
          <img src="./../assets/images/404.webp" alt="" />
        </div>
      </article>
    </div>

    <div ref="observerRef" class="observer"></div>
  </div>
</template>

<script setup>
import FilmCard from '@/components/FilmCard.vue'
import { ref, computed } from 'vue'
import store from '@/stores/index.js'
import { useHead } from '@unhead/vue'
import useFetch from '@/fetch.js'
import List from '~icons/bi/list'
import Grid from '~icons/bi/grid-3x3-gap-fill/'

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

var typeList = ref(false)

var listStore = computed(() => store[props.list]())

var url = computed(() =>
  listStore.value[props.list].data.length === 0
    ? ''
    : `movie?page=1&limit=250&${listStore.value[props.list].data.map((el) => `&id=${el}`).join('')}`
)

const { data, isFinished, error, isError } = useFetch(url, {
  refetch: true
}).json()

var mappedData = computed(() =>
  url.value === ''
    ? []
    : data?.value?.docs?.map(
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
)

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

const filteredFilmsByGenre = computed(() =>
  genresInput.value === null
    ? mappedData.value
    : mappedData.value.filter((el) => el?.genres?.includes(genresInput?.value?.toLowerCase()))
)

const filteredFilmsByType = computed(() =>
  typeInput.value === null
    ? filteredFilmsByGenre?.value
    : filteredFilmsByGenre?.value?.filter((el) => el.type == typeInput.value)
)

const searchedFilms = computed(() =>
  filteredFilmsByType?.value?.filter((film) =>
    film?.name?.toLowerCase()?.includes(search?.value?.toLowerCase())
  )
)
</script>

<style scoped>
.filmList-enter-active,
.filmList-leave-active {
  transition: all 0.3s ease-out;
}

.filmList-enter-from,
.filmList-leave-to {
  opacity: 0;
}

.notActiveBtn {
  background-color: white;
  color: #99c8ff;
}
</style>
