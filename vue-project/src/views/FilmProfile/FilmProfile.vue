<template>
  <div v-if="isError">
    <p class="fs-1 text-center">{{ error }}</p>
  </div>

  <main v-if="isFinished" :style="backgroundStyles(data?.backdrop?.url)" class="bg">
    <article class="text-white container">
      <About
        :film="{
          poster: data?.poster?.url || error?.poster?.url,
          id: data.id,
          name: data?.name,
          alternativeName: data.alternativeName,
          shortDescription: data?.shortDescription,
          year: data.year,
          countries: data.countries,
          genres: data.genres,
          budget: data.budget,
          movieLength: data.movieLength,
          fees: data.fees,
          ageRating: data.ageRating,
          premiere: data.premiere,
          rating: data.rating,
          top250: data.top250,
          director: data?.persons?.find((el) => el.profession === 'режиссеры').name
        }"
      />

      <section v-if="data?.description" class="my-3" id="description">
        <h2 class="fs-5 fw-bold text-blue mb-3">Описание</h2>
        <p class="fs-4">{{ data?.description }}</p>
      </section>

      <Watch
        id="watch"
        v-if="data?.watchability?.items.length > 0"
        :watch="data?.watchability?.items"
      />

      <OtherFilms
        id="sequels"
        v-if="data?.sequelsAndPrequels"
        :films="data?.sequelsAndPrequels"
        text="Другие части"
      />

      <OtherFilms
        id="similar"
        v-if="data?.similarMovies"
        :films="data?.similarMovies"
        text="Похожие фильмы"
      />

      <Persons :persons="data?.persons" />

      <Awards :id="id" />

      <Cadrs :id="id" />

      <Facts text="Интересные факты" :id="id" />
    </article>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Persons from './components/Persons.vue'
import Cadrs from './components/Cadrs.vue'
import About from './components/About.vue'
import OtherFilms from './components/OtherFilms.vue'
import Facts from './components/Facts.vue'
import Watch from './components/Watch.vue'
import Awards from './components/Awards.vue'
import { useHead } from '@unhead/vue'
import useFetch from '@/fetch.js'

const route = useRoute()
var id = ref(Number(route.params.id))

var url = computed(() => `movie/${id.value}`)

const { data, isFinished, error, isError, execute } = useFetch(url, {
  refetch: true
}).json()

if (isFinished) {
  console.log(execute())
}

var backgroundStyles = (img) => {
  var a = img.replace('orig', 'x660')
  return {
    background: `linear-gradient(rgba(33, 37, 41, 0.8) 0%, rgba(33, 37, 41, 0.8)),  url(${a})`,
    'background-repeat': 'no-repeat',
    'background-size': 'cover',
    'background-attachment': 'fixed',
    'background-position': '50% 50%'
  }
}

// 30 40 60 70 80 330 660 700 900

useHead({
  title: computed(() => data?.value?.name || data?.value?.alternativeName),
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          data?.value?.name +
          '. Информация о фильме: актёры, режиссёр, продюссеры, стаф, кадры, бюджет, хронометраж, сиквелы и приквелы, похожие фильмы, где посмотреть, интересные факты, ошибки и ляпы'
      )
    }
  ]
})

onBeforeRouteUpdate((updageGuard) => {
  id.value = Number(updageGuard.params.id)
})
</script>
