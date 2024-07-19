<template>
  <main class="p-4">
    <Releases />
    <News />
    <MainSearch />
  </main>
</template>

<script>
import News from './components/News.vue'
import MainSearch from './components/MainSearch.vue'
import Releases from './components/Releases.vue'

export default {
  head() {
    return {
      title: 'Главная',
      meta: [
        {
          name: 'description',
          content:
            'Большая база данных с фильмами и актёрами: свежие новости и статьи, релизы и даты выхода новинок, полная сводка данных о фильме и актёры.'
        }
      ]
    }
  },

  components: {
    News,
    Releases,
    MainSearch
  }
}
</script>
