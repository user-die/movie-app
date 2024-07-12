<template>
  <div class="d-flex flex-column gap-5">
    <div class="row">
      <div class="col-5">
        <BFormInput
          id="input-default"
          class="bg-dark border-danger text-white"
          placeholder="Поиск"
        />
      </div>

      <div class="col-2">
        <BFormSelect
          class="bg-dark border-danger text-white"
          v-model="genresInput"
          :options="genres"
        >
          <template #first>
            <BFormSelectOption :value="null" disabled>Жанр</BFormSelectOption>
          </template>
        </BFormSelect>
      </div>

      <div class="col-2">
        <BFormSelect class="bg-dark border-danger text-white" v-model="typeInput" :options="types">
          <template #first>
            <BFormSelectOption :value="null" disabled>Тип</BFormSelectOption>
          </template>
        </BFormSelect>
      </div>
    </div>

    <FilmsList :filmList="popularFilms.data" title="Популярные" />
    <FilmsList :filmList="mostViewed.data" title="Самые просматриваемые" />
    <FilmsList :filmList="inCinema.data" title="Сейчас в кино" />
    <FilmsList :filmList="latestFilms.data" title="Последние" />
    <FilmsList :filmList="bestsFilms.data" title="Лучшие" />
    <FilmsList :filmList="waiting.data" title="Ожидаемые" />
    <FilmsList :filmList="randomFilms.data" title="Случайные" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { BFormInput, BFormSelect, BFormSelectOption } from 'bootstrap-vue-next'
import FilmsList from '@/components/FilmsList.vue'
import options from '../options.json'

var typeInput = ref('Фильм')
var genresInput = ref(null)

var popularFilms = reactive({ data: [] })
var bestsFilms = reactive({ data: [] })
var latestFilms = reactive({ data: [] })
var randomFilms = reactive({ data: [] })
var inCinema = reactive({ data: [] })
var waiting = reactive({ data: [] })
var mostViewed = reactive({ data: [] })

var types = ['Фильм', 'Сериал', 'Мультфильм', 'Мультсериал', 'Аниме']
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
  'криминал',
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

async function getFilms(params, array) {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/${params}`, options['request1'])

  array.data = response.data.docs
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

var date = new Date().getFullYear()

onMounted(() => {
  /* ГОТОВО

  getFilms('movie?page=1&limit=10&sortField=votes.kp&sortType=-1&isSeries=false', mostViewed)


  getFilms(
    'movie?page=1&limit=10&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&ticketsOnSale=true',
    inCinema
  )

    getFilms(`movie?page=${randomInteger(1, 25)}&limit=10&lists=top250`, bestsFilms)

      getFilms(
    'movie?page=1&limit=10&sortField=votes.await&sortType=-1&lists=planned-to-watch-films&isSeries=false',
    waiting
  )
  
  getFilms(`movie?page=${randomInteger(1, 95000)}&limit=10&isSeries=false`, randomFilms)


  */
  //getFilms(`movie?page=1&limit=10&sortField=status&sortField=year&sortType=1&sortType=-1&isSeries=false&year=${date}`, latestFilms)*/  // Последние
  /*
  getFilms(
    'movie?page=1&limit=10&sortField=votes.await&sortType=-1&lists=popular-films&isSeries=false',
    popularFilms
  ) // Популярные

  */
})
</script>

<style scoped></style>
