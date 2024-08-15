<template>
  <article class="cv text-danger">
    <FilmsTable :films="lastReleases" title="Новинки месяца" />

    <FilmsTable :films="comingSoon" title="Скоро выйдут" />
  </article>
</template>

<script>
import axios from 'axios'
import options from '@/options.js'
import FilmsTable from './FilmsTable.vue'

export default {
  components: {
    FilmsTable
  },
  data() {
    return {
      lastReleases: [],
      comingSoon: []
    }
  },
  methods: {
    async getReleases() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.toLocaleString('En', { month: 'long' })
      var today = date.getDate()

      let response = await axios.get(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month.toUpperCase()}`,
        options['request2']
      )

      var filmsArray = await response.data.items.map(
        (element) =>
          (element = {
            id: element.kinopoiskId,
            name: element.nameRu,
            year: element.year,
            poster: element.posterUrlPreview,
            premiere: element.premiereRu
          })
      )

      this.lastReleases = filmsArray.filter((el) => el.premiere.slice(-2) < today)
      this.comingSoon = filmsArray.filter((el) => el.premiere.slice(-2) >= today)
    }
  },
  mounted() {
    this.getReleases()
  }
}
</script>
