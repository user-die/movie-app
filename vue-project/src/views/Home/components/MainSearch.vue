<template>
  <section class="mx-auto my-3 list253">
    <h2 class="fs-1 text-danger">Подобрать фильм</h2>

    <div class="row mb-3">
      <!-- 
          <div class="col-5">
        <label for="">Поиск по названию</label>
        <BFormInput
          id="input-default"
          class="mt-2 bg-dark border-danger text-white"
          v-model="search"
        />
      </div>
        -->

      <div class="col-2">
        <label for="">Жанр</label>
        <select class="form-select mt-2 bg-dark border-danger text-white" v-model="genresInput">
          <option :value="null">Не выбрано</option>
          <option v-for="option in genres" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="col-2">
        <label for="">Тип</label>
        <select class="form-select mt-2 bg-dark border-danger text-white" v-model="typeInput">
          <option :value="null">Не выбрано</option>
          <option v-for="option in types" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-2">
        <label for="">Рейтинг</label>
        <select class="form-select mt-1 bg-dark border-danger text-white" v-model="rating">
          <option value="kp">Кинопоиск</option>
          <option value="imdb">IMDb</option>
        </select>
      </div>

      <div class="col-2">
        <label for="">от</label>
        <input
          class="form-control mt-1 bg-dark border-danger text-white"
          v-model="ratingFrom"
          type="number"
          min="0"
          max="10"
        />
      </div>

      <div class="col-2">
        <label for="">до</label>

        <input
          class="form-control mt-1 bg-dark border-danger text-white"
          v-model="ratingUp"
          type="number"
          min="0"
          max="10"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-2">
        <label for="">Год от</label>
        <input
          class="form-control mt-1 bg-dark border-danger text-white"
          v-model="yearFrom"
          type="number"
          min="1874"
          max="2050"
        />
      </div>

      <div class="col-2">
        <label for="">Год до</label>
        <input
          class="form-control mt-1 bg-dark border-danger text-white"
          v-model="yearUp"
          type="number"
          min="1874"
          max="2050"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-2">
        <button class="btn btn-primary" @click="searchFilm">Найти</button>
      </div>
    </div>

    <article class="grid list253">
      <p v-if="isSearch">Поиск ...</p>
      <FilmCard v-for="film in films" :key="film.id" :item="film" class="w270" />
    </article>

    <div
      v-if="this.films.length > 0"
      class="d-flex w-100 overflow-hidden justify-content-center mt-3 gap-2"
    >
      <button class="btn btn-outline-primary" @click="this.currentPage = 1">
        {{ '<<' }}
      </button>

      <button class="btn btn-outline-primary" @click="this.currentPage -= 1">
        {{ '<' }}
      </button>

      <button
        v-if="currentPage !== 1"
        class="btn btn-outline-primary"
        @click="this.currentPage = 1"
      >
        {{ 1 }}
      </button>

      <button v-if="![1, 2, 3, 4].includes(currentPage)" class="btn btn-outline-primary">
        {{ '...' }}
      </button>

      <button
        class="btn btn-outline-primary"
        v-for="btn in buttons"
        :key="btn"
        :class="{
          'btn-primary text-white': currentPage === btn
        }"
        @click="this.currentPage = btn"
      >
        {{ btn }}
      </button>

      <button
        v-if="
          ![
            this.totalPages,
            this.totalPages - 1,
            this.totalPages - 2,
            this.totalPages - 3
          ].includes(currentPage)
        "
        class="btn btn-outline-primary"
      >
        {{ '...' }}
      </button>

      <button
        v-if="currentPage !== totalPages"
        class="btn btn-outline-primary"
        @click="this.currentPage = this.totalPages"
      >
        {{ this.totalPages }}
      </button>

      <button class="btn btn-outline-primary" @click="this.currentPage += 1">
        {{ '>' }}
      </button>

      <button class="btn btn-outline-primary" @click="this.currentPage = this.totalPages">
        {{ '>>' }}
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import options from '@/options.json'
import FilmCard from '@/components/FilmCard.vue'
import { computed } from 'vue'

export default {
  components: {
    FilmCard
  },
  data() {
    return {
      isSearch: false,
      films: [],
      currentPage: 1,
      ex2PerPage: 1,
      totalPages: 0,
      buttons: computed(() => [
        ...Array.from({ length: 2 }, (_, i) => this.currentPage - 1 - i)
          .reverse()
          .filter((el) => el > 1),
        this.currentPage,
        ...Array.from({ length: 2 }, (_, i) => this.currentPage + 1 + i).filter(
          (el) => el < this.totalPages
        )
      ]),

      genresInput: null,
      typeInput: null,

      rating: 'kp',
      ratingFrom: 0,
      ratingUp: 10,

      yearFrom: 1874,
      yearUp: 2050,

      ratingNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      genres: [
        'биография',
        'боевик',
        'вестерн',
        'военный',
        'детектив',
        'детский',
        'для взрослых',
        'документальный',
        'драма',
        'игра',
        'история',
        'комедия',
        'концерт',
        'короткометражка',
        'криминал',
        'мелодрама',
        'музыка',
        'мультфильм',
        'мюзикл',
        'новости',
        'нуар',
        'приключения',
        'реальное ТВ',
        'семейный',
        'спорт',
        'ток-шоу',
        'триллер',
        'ужасы',
        'фантаскика',
        'фэнтези',
        'церемония'
      ],
      types: [
        { value: 'movie', text: 'Фильм' },
        { value: 'tv-series', text: 'Сериал' },
        { value: 'cartoon', text: 'Мультфильм' },
        { value: 'animated-series', text: 'Мультсериал' },
        { value: 'anime', text: 'Аниме' }
      ]
    }
  },
  methods: {
    async searchFilm() {
      this.isSearch = true

      let response = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie?page=${this.currentPage}&limit=20&year=${this.yearFrom + '-' + this.yearUp}&rating.${this.rating}=${this.ratingFrom + '-' + this.ratingUp}${this.typeInput ? '&type=' + this.typeInput : ''}${this.genresInput ? '&genres.name=' + this.genresInput : ''}`,
        options['request1']
      )

      this.totalPages = response.data.pages

      this.films = response.data.docs.map(
        (element) =>
          (element = {
            id: element?.id,
            name: element?.name || element?.alternativeName,
            image: element?.poster?.url?.replace('orig', 'x390'),
            genres: element?.genres?.map((el) => el.name),
            year: element?.year,
            rating: {
              kp: element?.rating?.kp,
              imdb: element?.rating?.imdb
            }
          })
      )

      this.isSearch = false
    }
  },
  watch: {
    currentPage: function () {
      this.films = []
      this.searchFilm()
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 270px);
}

.list {
  width: round(down, 100%, 286px);
}
</style>
