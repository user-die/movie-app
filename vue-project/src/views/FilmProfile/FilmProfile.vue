<template>
  <div v-if="isError">
    <p class="fs-1 text-center">{{ errorMessage }}</p>
  </div>

  <div v-else :style="backgroundStyles(film?.data?.backdrop?.url?.replace('orig', 'x660'))">
    <article class="text-white container p-4 bg">
      <div>
        <About
          :film="{
            poster: film.data?.poster?.url?.replace('orig', 'x390'),
            id: film.data.id,
            name: film.data?.name,
            alternativeName: film.data.alternativeName,
            shortDescription: film.data?.shortDescription,
            year: film.data.year,
            countries: film.data.countries,
            genres: film.data.genres,
            budget: film.data.budget,
            movieLength: film.data.movieLength,
            fees: film.data.fees,
            ageRating: film.data.ageRating,
            premiere: film.data.premiere,
            rating: film.data.rating,
            top250: film.data.top250,
            director: film.data?.persons?.find((el) => el.profession === 'режиссеры').name
          }"
        />
      </div>

      <Watch :watch="film.data?.watchability?.items" />

      <section v-if="film.data?.description" class="row my-4">
        <h2 class="text-danger fs-1 fw-bold">Описание</h2>
        <p class="fs-4">{{ film.data?.description }}</p>
      </section>

      <Staff :staff="actors" text="Актёры" />

      <Staff :staff="mainStaff" text="Над фильмом работали" />

      <Staff :staff="dubbingActors" text="Актёры дубляжа" />

      <Awards :id="id" />

      <Cadrs :id="id" />

      <OtherFilms
        v-if="film.data.sequelsAndPrequels"
        :films="film.data.sequelsAndPrequels"
        text="Другие части"
      />

      <OtherFilms
        v-if="film.data.similarMovies"
        :films="film.data.similarMovies"
        text="Похожие фильмы"
      />

      <Facts text="Интересные факты" :id="film.data.id" />
    </article>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import Staff from './components/Staff.vue'
import Cadrs from './components/Cadrs.vue'
import About from './components/About.vue'
import OtherFilms from './components/OtherFilms.vue'
import Facts from './components/Facts.vue'
import Watch from './components/Watch.vue'
import Awards from './components/Awards.vue'
import { useHead } from '@unhead/vue'

const isError = ref(false)
const errorMessage = ref()

const route = useRoute()
var id = ref(route.params.id)
var film = reactive({
  data: {}
})

var actors = computed(() => film?.data?.persons?.filter((el) => el.profession === 'актеры'))
var staff = computed(() => film?.data?.persons?.filter((el) => el.profession !== 'актеры'))

var dubbingActors = computed(() => staff?.value?.filter((el) => el.profession === 'актеры дубляжа'))

var sorderStaff = computed(() =>
  staff?.value
    ?.filter((el) => el.profession !== 'актеры дубляжа')
    .reduce((acc, el) => {
      acc[el.name] = acc[el.name] || { name: el.name, id: el.id, photo: el.photo, professions: [] }
      acc[el.name].professions.push(el.profession)
      return acc
    }, {})
)

var mainStaff = computed(
  () =>
    sorderStaff.value &&
    Object.fromEntries(
      Object.entries(sorderStaff?.value).sort(
        (a, b) => b[1].professions.length - a[1].professions.length
      )
    )
)

var backgroundStyles = (img) => {
  return {
    background: `linear-gradient(rgba(33, 37, 41, 0.8) 0%, rgba(33, 37, 41, 0.8)), url(${img})`,
    'background-repeat': 'no-repeat',
    'background-size': '100%',
    'background-attachment': 'fixed'
  }
}

var getFilm = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie/${id}`,
    options['request1']
  ).catch((error) => {
    errorMessage.value = error.response.data.message
    isError.value = true
  })

  film.data = response.data
}

useHead({
  title: computed(() => film?.data?.name || film?.data?.alternativeName),
  meta: [
    {
      name: 'description',
      content: computed(
        () =>
          film?.data?.name ||
          film?.data?.alternativeName +
            '. Информация о фильме: актёры, режиссёр, продюссеры, стаф, кадры, бюджет, хронометраж, сиквелы и приквелы, похожие фильмы, где посмотреть, интересные факты, ошибки и ляпы'
      )
    }
  ]
})

watch(route, (newValue) => {
  id.value = newValue.params.id

  getFilm(newValue.params.id)
})

onMounted(() => {
  getFilm(id.value)
})
</script>

<style scoped>
.bg {
  background: rgba(18, 18, 18, 0.6);
}
</style>
