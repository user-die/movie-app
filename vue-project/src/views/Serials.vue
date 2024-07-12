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
    <FilmsList :filmList="latestFilms.data" title="Последние" />
    <FilmsList :filmList="bestsFilms.data" title="Лучшие" />
    <FilmsList :filmList="randomFilms.data" title="Случайные" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { BFormInput, BFormSelect, BFormSelectOption } from 'bootstrap-vue-next'
import FilmsList from '@/components/FilmsList.vue'
import options from '../options.json'

var typeInput = ref('Сериал')
var genresInput = ref(null)

var popularFilms = reactive({ data: [] })
var bestsFilms = reactive({ data: [] })
var latestFilms = reactive({ data: [] })
var randomFilms = reactive({ data: [] })

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
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=4${params}`,
    options
  )

  array.data = response.data.docs
}

onMounted(() => {
  getFilms('&sortField=audience.count&sortType=1&isSeries=true', popularFilms)
  getFilms('&lists=top250&isSeries=true', bestsFilms)
  getFilms('&lists=top250&isSeries=true', latestFilms)
  getFilms('&rating.imdb=8-10&isSeries=true', randomFilms)
})
</script>

<style scoped></style>
