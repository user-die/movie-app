<template>
  <div
    class="container mainBg p-4 d-flex flex-column justify-content-between"
    style="min-height: 100vh"
  >
    <div>
      <h2 class="fs-1 fw-bold text-danger">Избранное</h2>

      <div class="row mb-3">
        <div class="col-5">
          <label for="">Поиск по названию</label>
          <BFormInput
            id="input-default"
            class="mt-2 bg-dark border-danger text-white"
            v-model="search"
          />
        </div>

        <div class="col-2">
          <label for="">Жанр</label>
          <BFormSelect
            class="mt-2 bg-dark border-danger text-white"
            v-model="genresInput"
            :options="genres"
          >
            <template #first>
              <BFormSelectOption :value="null">Не выбрано</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>

        <div class="col-2">
          <label for="">Тип</label>
          <BFormSelect
            class="mt-2 bg-dark border-danger text-white"
            v-model="typeInput"
            :options="types"
          >
            <template #first>
              <BFormSelectOption :value="null">Не выбрано</BFormSelectOption>
            </template>
          </BFormSelect>
        </div>
      </div>

      <article class="row row-gap-3">
        <FilmCard
          v-for="film in searchedFilms"
          :key="film.id"
          :item="film"
          style="width: 270px"
        ></FilmCard>

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
import { BFormInput, BFormSelect, BFormSelectOption } from 'bootstrap-vue-next'
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoritesStore = useFavoritesStore()

const films = reactive({
  data: []
})

/*
const observerRef = ref(null)
var page = ref(1)
var itemInPage = 10
*/

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
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&${favoritesStore.favorites.data.map((el) => `&id=${el}`).join('')}`,
    options
  )

  films.data = [
    ...films.data,
    ...response.data.docs.map(
      (element) =>
        (element = {
          id: element.id,
          name: element.name,
          image: element.poster.url,
          year: element.year,
          type: element.type,
          genres: element.genres.map((el) => el.name),
          rating: {
            kp: element.rating.kp,
            imdb: element.rating.imdb
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
  favoritesStore.favorites,
  (newValue, oldValue) => {
    if (newValue.length > oldValue.length) getFilms()
    else films.data = films.data.filter((el) => newValue.data.includes(el.id))
  },
  { deep: true }
)

onMounted(() => {
  getFilms()

  /*
  var options = {
    rootMargin: '0px',
    threshold: 1.0
  }

  var callback = (entries) => {
    if (entries[0].isIntersecting && page.value < 250) {
      page.value++

      favoritesStore.favorites.data.forEach((element, index) => {
        if (index >= page.value * itemInPage - itemInPage && index < page.value * itemInPage)
          getFilms(element)
      })
    }
  }

  var observer = new IntersectionObserver(callback, options)
  observer.observe(observerRef.value)
  */
})
</script>

<style scoped></style>
